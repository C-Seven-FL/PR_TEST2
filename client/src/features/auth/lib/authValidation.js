import * as yup from "yup";

const passwordPattern = /^[\x21-\x7e]{8,32}$/;
const phonePattern = /^\+?[0-9\s()/.-]{7,20}$/;
const MINUTES_IN_DAY = 24 * 60;
const MAX_SLOT_DURATION_MINUTES = 4 * 60;

export function parseTimeToMinutes(value) {
  if (!value || typeof value !== "string") {
    return NaN;
  }

  const [rawHours, rawMinutes] = value.split(":");
  const hours = Number(rawHours);
  const minutes = Number(rawMinutes);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return NaN;
  }

  return hours * 60 + minutes;
}

export function formatMinutesToTime(totalMinutes) {
  const normalized = Math.max(0, Math.min(totalMinutes, MINUTES_IN_DAY - 1));
  const hours = Math.floor(normalized / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (normalized % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function normalizeProviderEndTime(hourStart, hourEnd, slotDuration) {
  const startMinutes = parseTimeToMinutes(hourStart);
  const endMinutes = parseTimeToMinutes(hourEnd);
  const slotMinutes = parseTimeToMinutes(slotDuration);

  if (
    Number.isNaN(startMinutes) ||
    Number.isNaN(slotMinutes) ||
    slotMinutes <= 0 ||
    startMinutes + slotMinutes >= MINUTES_IN_DAY
  ) {
    return hourEnd;
  }

  const minimumEnd = startMinutes + slotMinutes;
  const shouldResetEnd =
    Number.isNaN(endMinutes) ||
    endMinutes <= startMinutes ||
    endMinutes < minimumEnd ||
    (endMinutes - startMinutes) % slotMinutes !== 0;

  return shouldResetEnd ? formatMinutesToTime(minimumEnd) : hourEnd;
}

function isProvider(parent) {
  return parent?.role === "Provider";
}

function isValidTimeValue(value) {
  return !Number.isNaN(parseTimeToMinutes(value));
}

function buildRegisterSchema() {
  return {
    firstName: yup.string().trim().required("Vyplňte prosím jméno."),
    lastName: yup.string().trim().required("Vyplňte prosím příjmení."),
    login: yup.string().trim().required("Vyplňte prosím login."),
    phoneNumber: yup
      .string()
      .test("phone-format", "Zadejte platné telefonní číslo.", (value) => {
        if (!value?.trim()) {
          return true;
        }

        const digits = value.replace(/\D/g, "");
        return phonePattern.test(value.trim()) && digits.length >= 9;
      }),
    birthdate: yup
      .string()
      .required("Vyberte datum narození.")
      .test(
        "birthdate-format",
        "Datum narození není ve správném formátu.",
        (value) => {
          if (!value) {
            return false;
          }

          return !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
        },
      )
      .test(
        "birthdate-not-future",
        "Datum narození nemůže být v budoucnosti.",
        (value) => {
          if (!value) {
            return true;
          }

          return new Date(`${value}T00:00:00`) <= new Date();
        },
      ),
    gender: yup.string().required("Vyberte pohlaví."),
    address: yup.string(),
    role: yup.string().required("Vyberte roli klient nebo provider."),
    confirmPassword: yup
      .string()
      .required("Potvrďte prosím heslo.")
      .oneOf([yup.ref("password")], "Hesla se musí shodovat."),
    serviceName: yup.string().when("role", {
      is: "Provider",
      then: (schema) =>
        schema.trim().required("Vyplňte název první služby nebo firmy."),
      otherwise: (schema) => schema.notRequired(),
    }),
    companyCategory: yup.string().when("role", {
      is: "Provider",
      then: (schema) => schema.required("Vyberte kategorii služby."),
      otherwise: (schema) => schema.notRequired(),
    }),
    serviceDescription: yup.string(),
    workingDays: yup.array().when("role", {
      is: "Provider",
      then: (schema) => schema.min(1, "Vyberte alespoň jeden pracovní den."),
      otherwise: (schema) => schema.notRequired(),
    }),
    hourStart: yup.string().test(
      "provider-hour-start",
      "Začátek pracovní doby je příliš pozdě pro zvolenou délku slotu.",
      function testHourStart(value) {
        if (!isProvider(this.parent)) {
          return true;
        }

        const startMinutes = parseTimeToMinutes(value);
        const slotMinutes = parseTimeToMinutes(this.parent.slotDuration);

        if (Number.isNaN(startMinutes)) {
          return this.createError({
            message: "Vyberte začátek pracovní doby.",
          });
        }

        if (Number.isNaN(slotMinutes)) {
          return true;
        }

        return startMinutes + slotMinutes < MINUTES_IN_DAY;
      },
    ),
    hourEnd: yup.string().test(
      "provider-hour-end",
      "Konec pracovní doby musí být později než začátek.",
      function testHourEnd(value) {
        if (!isProvider(this.parent)) {
          return true;
        }

        const startMinutes = parseTimeToMinutes(this.parent.hourStart);
        const endMinutes = parseTimeToMinutes(value);
        const slotMinutes = parseTimeToMinutes(this.parent.slotDuration);

        if (Number.isNaN(endMinutes)) {
          return this.createError({ message: "Vyberte konec pracovní doby." });
        }

        if (Number.isNaN(startMinutes) || Number.isNaN(slotMinutes)) {
          return true;
        }

        const workingWindow = endMinutes - startMinutes;

        if (endMinutes <= startMinutes) {
          return this.createError({
            message: "Konec pracovní doby musí být později než začátek.",
          });
        }

        if (workingWindow < slotMinutes) {
          return this.createError({
            message:
              "Mezi začátkem a koncem musí být místo alespoň pro jednu rezervaci.",
          });
        }

        if (workingWindow % slotMinutes !== 0) {
          return this.createError({
            message: "Rozsah pracovní doby musí vycházet na celé rezervační sloty.",
          });
        }

        return true;
      },
    ),
    slotDuration: yup.string().test(
      "provider-slot-duration",
      "Délka slotu musí být mezi 15 minutami a 4 hodinami po 15 minutách.",
      function testSlotDuration(value) {
        if (!isProvider(this.parent)) {
          return true;
        }

        const slotMinutes = parseTimeToMinutes(value);

        if (Number.isNaN(slotMinutes)) {
          return this.createError({
            message: "Vyberte délku jedné rezervace.",
          });
        }

        if (
          slotMinutes < 15 ||
          slotMinutes > MAX_SLOT_DURATION_MINUTES ||
          slotMinutes % 15 !== 0
        ) {
          return this.createError({
            message:
              "Délka slotu musí být mezi 15 minutami a 4 hodinami po 15 minutách.",
          });
        }

        return true;
      },
    ),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "Pro registraci je potřeba souhlasit s podmínkami."),
  };
}

export function getAuthValidationSchema(mode) {
  return yup.object({
    email: yup
      .string()
      .trim()
      .required("Vyplňte prosím e-mail.")
      .email("Zadejte prosím platný e-mail."),
    password: yup
      .string()
      .required("Vyplňte prosím heslo.")
      .matches(
        passwordPattern,
        "Heslo musí mít 8 až 32 ASCII znaků bez mezer.",
      ),
    ...(mode === "register" ? buildRegisterSchema() : {}),
  });
}

export async function validateAuthForm(mode, values) {
  const schema = getAuthValidationSchema(mode);

  try {
    await schema.validate(values, { abortEarly: false });
    return {};
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) {
      throw error;
    }

    return error.inner.reduce((accumulator, currentError) => {
      if (currentError.path && !accumulator[currentError.path]) {
        accumulator[currentError.path] = currentError.message;
      }

      return accumulator;
    }, {});
  }
}

export function getFieldError(name, touched, errors) {
  return touched[name] ? errors[name] : undefined;
}

export function hasFieldError(name, touched, errors) {
  return Boolean(getFieldError(name, touched, errors));
}

export function isTimeFieldValid(value) {
  return isValidTimeValue(value);
}
