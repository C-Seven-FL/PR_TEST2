import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  getFieldError,
  normalizeProviderEndTime,
  validateAuthForm,
} from "../lib/authValidation";
import { env } from "../../../shared/config/env";
import { persistUserRole } from "../lib/userRole";
import { authClient } from "../../../shared/lib/auth/authClient";

const DAY_OPTIONS = [
  { value: "Monday", label: "Po" },
  { value: "Tuesday", label: "Út" },
  { value: "Wednesday", label: "St" },
  { value: "Thursday", label: "Čt" },
  { value: "Friday", label: "Pá" },
  { value: "Saturday", label: "So" },
  { value: "Sunday", label: "Ne" },
];

const GENDER_OPTIONS = [
  { value: "Muž", label: "Muž" },
  { value: "Žena", label: "Žena" },
];

const ROLE_OPTIONS = [
  { value: "Client", label: "Client" },
  { value: "Provider", label: "Provider" },
];

const CATEGORY_OPTIONS = [
  { value: "beauty", label: "Beauty studio" },
  { value: "barber", label: "Barber / hair" },
  { value: "massage", label: "Masáže" },
  { value: "fitness", label: "Fitness / coaching" },
  { value: "wellness", label: "Wellness" },
  { value: "health", label: "Health care" },
];

const PROVIDER_DEFAULTS = {
  serviceName: "",
  companyCategory: "",
  serviceDescription: "",
  workingDays: [],
  hourStart: "09:00",
  hourEnd: "17:00",
  slotDuration: "01:00",
};

const REGISTER_STEP_FIELDS = {
  0: ["firstName", "lastName", "login", "email", "password", "confirmPassword"],
  1: ["phoneNumber", "birthdate", "gender", "address", "role", "agreeToTerms"],
  2: [
    "serviceName",
    "companyCategory",
    "workingDays",
    "hourStart",
    "hourEnd",
    "slotDuration",
  ],
};

const createInitialFormValues = () => ({
  firstName: "",
  lastName: "",
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  birthdate: "",
  gender: "",
  address: "",
  role: "",
  ...PROVIDER_DEFAULTS,
  agreeToTerms: false,
});

const getControlStyles = (hasError) => ({
  borderRadius: "18px",
  borderWidth: "1px",
  borderColor: hasError ? "var(--danger)" : "rgba(15, 23, 46, 0.14)",
  bg: "rgba(255, 255, 255, 0.96)",
  color: "var(--text-primary)",
  _placeholder: { color: "#91a1b9" },
  _hover: {
    borderColor: hasError ? "var(--danger)" : "rgba(23, 146, 208, 0.24)",
  },
  _focusVisible: {
    borderColor: hasError ? "var(--danger)" : "#1792d0",
    boxShadow: hasError
      ? "0 0 0 4px rgba(239, 107, 107, 0.14)"
      : "0 0 0 4px rgba(23, 146, 208, 0.14)",
  },
});

function Field({ label, required = false, error, helper, children }) {
  return (
    <Box>
      <Text fontSize="13px" fontWeight="700" color="var(--text-primary)" mb="8px">
        {label}
        {required ? (
          <Box as="span" color="var(--danger)" ml="4px">
            *
          </Box>
        ) : null}
      </Text>

      {children}

      {error ? (
        <Text mt="8px" fontSize="12px" lineHeight="1.5" color="var(--danger)">
          {error}
        </Text>
      ) : helper ? (
        <Text mt="8px" fontSize="12px" lineHeight="1.5" color="var(--text-tertiary)">
          {helper}
        </Text>
      ) : null}
    </Box>
  );
}

function SelectField({ error, children, ...props }) {
  return (
    <Box
      as="select"
      w="100%"
      h="56px"
      px="16px"
      appearance="none"
      cursor="pointer"
      {...getControlStyles(Boolean(error))}
      {...props}
    >
      {children}
    </Box>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.52)"
      border="1px solid rgba(120, 151, 193, 0.18)"
      borderRadius="26px"
      p={{ base: "18px", md: "24px" }}
      backdropFilter="blur(10px)"
    >
      <Box mb="18px">
        <Text
          fontSize={{ base: "22px", md: "24px" }}
          lineHeight="1.1"
          letterSpacing="-0.04em"
          fontWeight="800"
          color="var(--text-primary)"
          mb="8px"
        >
          {title}
        </Text>
        {description ? (
          <Text color="var(--text-secondary)" fontSize="14px" lineHeight="1.65">
            {description}
          </Text>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}

function StepChip({ isActive, isDone, children }) {
  return (
    <Flex
      h="40px"
      px="14px"
      borderRadius="999px"
      align="center"
      justify="center"
      bg={
        isActive
          ? "rgba(23, 146, 208, 0.12)"
          : isDone
            ? "rgba(47, 183, 199, 0.12)"
            : "rgba(255, 255, 255, 0.74)"
      }
      border="1px solid"
      borderColor={
        isActive
          ? "rgba(23, 146, 208, 0.22)"
          : isDone
            ? "rgba(47, 183, 199, 0.18)"
            : "rgba(15, 23, 46, 0.08)"
      }
      color={isActive ? "#126e9d" : "var(--text-secondary)"}
      fontSize="12px"
      fontWeight="800"
      letterSpacing="0.04em"
      textTransform="uppercase"
    >
      {children}
    </Flex>
  );
}

function getAuthErrorMessage(error, isRegister) {
  const code = error?.code;

  switch (code) {
    case "auth/email-already-in-use":
      return "Tento e-mail už existuje. Použijte jiný nebo se přihlaste.";
    case "auth/invalid-email":
      return "E-mail nemá platný formát.";
    case "auth/weak-password":
      return "Heslo je příliš slabé. Použijte 8 až 32 ASCII znaků.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Přihlášení se nepodařilo. Zkontrolujte e-mail a heslo.";
    case "auth/popup-closed-by-user":
      return "Google přihlášení bylo zavřeno před dokončením.";
    default:
      return error instanceof Error
        ? error.message
        : isRegister
          ? "Registraci se nepodařilo dokončit."
          : "Přihlášení se nepodařilo dokončit.";
  }
}

export function AuthForm({ mode, onModeChange, onOpenGoogleModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [registerStep, setRegisterStep] = useState(0);

  const isRegister = mode === "register";
  const callbackURL = location.state?.from?.pathname || "/dashboard";

  const formik = useFormik({
    initialValues: createInitialFormValues(),
    validateOnBlur: true,
    validateOnChange: true,
    validate: async (values) => validateAuthForm(mode, values),
    onSubmit: async (values, helpers) => {
      setFeedbackMessage("");

      try {
        if (isRegister) {
          persistUserRole(values.role || "client");
          await authClient.registerWithEmail(values.email.trim(), values.password);
        } else {
          await authClient.loginWithEmail(values.email.trim(), values.password);
        }

        setFeedbackMessage(
          "Autentizace proběhla úspěšně. Přesměrovávám vás na dashboard.",
        );
        navigate(callbackURL, { replace: true });
      } catch (error) {
        setFeedbackMessage(getAuthErrorMessage(error, isRegister));
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleBlur,
    resetForm,
    setFieldTouched,
    setFieldValue,
    setTouched,
    validateForm,
  } = formik;

  const isProvider = isRegister && values.role === "Provider";

  const registerSteps = useMemo(
    () =>
      isProvider
        ? [
            { index: 0, label: "Účet" },
            { index: 1, label: "Profil" },
            { index: 2, label: "Služba" },
          ]
        : [
            { index: 0, label: "Účet" },
            { index: 1, label: "Profil" },
          ],
    [isProvider],
  );

  const lastRegisterStep = registerSteps.length - 1;

  useEffect(() => {
    if (!isProvider && registerStep > 1) {
      setRegisterStep(1);
    }
  }, [isProvider, registerStep]);

  useEffect(() => {
    if (!isProvider) {
      return;
    }

    const nextHourEnd = normalizeProviderEndTime(
      values.hourStart,
      values.hourEnd,
      values.slotDuration,
    );

    if (nextHourEnd !== values.hourEnd) {
      setFieldValue("hourEnd", nextHourEnd, false);
    }
  }, [
    isProvider,
    setFieldValue,
    values.hourEnd,
    values.hourStart,
    values.slotDuration,
  ]);

  const getError = (name) => getFieldError(name, touched, errors);

  const handleFieldChange = (event) => {
    setFeedbackMessage("");
    formik.handleChange(event);

    if (event.target.name === "role" && event.target.value !== "Provider") {
      Object.entries(PROVIDER_DEFAULTS).forEach(([field, value]) => {
        setFieldValue(field, value, false);
        setFieldTouched(field, false, false);
      });
    }
  };

  const handleDayToggle = (dayValue) => {
    setFeedbackMessage("");

    const isSelected = values.workingDays.includes(dayValue);
    const nextWorkingDays = isSelected
      ? values.workingDays.filter((item) => item !== dayValue)
      : [...values.workingDays, dayValue];

    setFieldTouched("workingDays", true, false);
    setFieldValue("workingDays", nextWorkingDays);
  };

  const handleModeSwitch = () => {
    setFeedbackMessage("");
    setRegisterStep(0);
    resetForm();
    onModeChange(isRegister ? "login" : "register");
  };

  const handleNextRegisterStep = async () => {
    const fieldsForStep = REGISTER_STEP_FIELDS[registerStep] || [];
    const touchedMap = { ...touched };

    fieldsForStep.forEach((field) => {
      touchedMap[field] = true;
    });

    setTouched(touchedMap, false);

    const validationErrors = await validateForm();
    const hasStepError = fieldsForStep.some((field) => validationErrors[field]);

    if (hasStepError) {
      return;
    }

    setRegisterStep((current) => Math.min(current + 1, lastRegisterStep));
  };

  const handleGoogleSignIn = async () => {
    setFeedbackMessage("");

    try {
      await authClient.loginWithGoogle();
      navigate(callbackURL, { replace: true });
    } catch (error) {
      if (
        error?.code === "auth/operation-not-allowed" ||
        error?.code === "auth/configuration-not-found"
      ) {
        onOpenGoogleModal?.();
        return;
      }

      setFeedbackMessage(getAuthErrorMessage(error, false));
    }
  };

  const handleMockLogin = async (role) => {
    setFeedbackMessage("");

    try {
      await authClient.loginAsMockRole(role);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFeedbackMessage(getAuthErrorMessage(error, false));
    }
  };

  const renderRegisterStep = () => {
    if (registerStep === 0) {
      return (
        <SectionCard
          title="Základ účtu"
          description="Nejdřív vytvoříte přihlašovací údaje a jméno účtu."
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
            gap="16px"
          >
            <Field label="Name" required error={getError("firstName")}>
              <Input
                name="firstName"
                value={values.firstName}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="Jana"
                h="56px"
                {...getControlStyles(Boolean(getError("firstName")))}
              />
            </Field>

            <Field label="Surname" required error={getError("lastName")}>
              <Input
                name="lastName"
                value={values.lastName}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="Nováková"
                h="56px"
                {...getControlStyles(Boolean(getError("lastName")))}
              />
            </Field>

            <Field label="Login" required error={getError("login")}>
              <Input
                name="login"
                value={values.login}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="jana.novak"
                h="56px"
                {...getControlStyles(Boolean(getError("login")))}
              />
            </Field>

            <Field label="Mail" required error={getError("email")}>
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="jana@bookio.cz"
                h="56px"
                {...getControlStyles(Boolean(getError("email")))}
              />
            </Field>

            <Field
              label="Password"
              required
              error={getError("password")}
              helper="8 až 32 ASCII znaků bez mezer."
            >
              <Input
                name="password"
                type="password"
                value={values.password}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="••••••••••••"
                h="56px"
                {...getControlStyles(Boolean(getError("password")))}
              />
            </Field>

            <Field
              label="Confirm password"
              required
              error={getError("confirmPassword")}
            >
              <Input
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="••••••••••••"
                h="56px"
                {...getControlStyles(Boolean(getError("confirmPassword")))}
              />
            </Field>
          </Grid>
        </SectionCard>
      );
    }

    if (registerStep === 1) {
      return (
        <SectionCard
          title="Profil a role"
          description="Doplňte kontakt a vyberte, jestli chcete účet klienta nebo providera."
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
            gap="16px"
          >
            <Field label="Phone number" error={getError("phoneNumber")}>
              <Input
                name="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="+420 777 123 456"
                h="56px"
                {...getControlStyles(Boolean(getError("phoneNumber")))}
              />
            </Field>

            <Field label="Birthdate" required error={getError("birthdate")}>
              <Input
                name="birthdate"
                type="date"
                value={values.birthdate}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                h="56px"
                {...getControlStyles(Boolean(getError("birthdate")))}
              />
            </Field>

            <Field label="Gender" required error={getError("gender")}>
              <SelectField
                name="gender"
                value={values.gender}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={getError("gender")}
              >
                <option value="">Vyberte pohlaví</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </Field>

            <Field label="Role" required error={getError("role")}>
              <SelectField
                name="role"
                value={values.role}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={getError("role")}
              >
                <option value="">Vyberte roli</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </Field>

            <Box gridColumn={{ md: "span 2" }}>
              <Field label="Address" error={getError("address")}>
                <Input
                  name="address"
                  value={values.address}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  placeholder="Praha 7, U Průhonu 14"
                  h="56px"
                  {...getControlStyles(Boolean(getError("address")))}
                />
              </Field>
            </Box>
          </Grid>

          {isProvider ? (
            <Box
              mt="18px"
              p="16px"
              borderRadius="20px"
              bg="rgba(23, 146, 208, 0.08)"
              border="1px solid rgba(23, 146, 208, 0.12)"
            >
              <Text fontSize="14px" fontWeight="700" color="var(--text-primary)">
                V dalším kroku nastavíte první službu a pracovní dobu.
              </Text>
            </Box>
          ) : null}

          <Flex as="label" align="flex-start" gap="10px" cursor="pointer" mt="18px">
            <Box
              as="input"
              type="checkbox"
              name="agreeToTerms"
              checked={values.agreeToTerms}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              mt="4px"
              accentColor="#1792d0"
            />
            <Box>
              <Text fontSize="13px" color="var(--text-secondary)" lineHeight="1.7">
                Souhlasím s obchodními podmínkami a se zpracováním údajů pro
                vytvoření účtu.
              </Text>
              {getError("agreeToTerms") ? (
                <Text mt="6px" fontSize="12px" color="var(--danger)">
                  {getError("agreeToTerms")}
                </Text>
              ) : null}
            </Box>
          </Flex>
        </SectionCard>
      );
    }

    return (
      <SectionCard
        title="První služba"
        description="Jen krátké nastavení, aby provider mohl rovnou začít pracovat s dostupností."
      >
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
          gap="16px"
        >
          <Field label="Company name" required error={getError("serviceName")}>
            <Input
              name="serviceName"
              value={values.serviceName}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              placeholder="Studio Aurora"
              h="56px"
              {...getControlStyles(Boolean(getError("serviceName")))}
            />
          </Field>

          <Field
            label="Company category"
            required
            error={getError("companyCategory")}
          >
            <SelectField
              name="companyCategory"
              value={values.companyCategory}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              error={getError("companyCategory")}
            >
              <option value="">Vyberte kategorii</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </Field>

          <Box gridColumn={{ md: "span 2" }}>
            <Field label="Description" error={getError("serviceDescription")}>
              <Textarea
                name="serviceDescription"
                value={values.serviceDescription}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                placeholder="Krátký popis služby"
                minH="116px"
                resize="vertical"
                {...getControlStyles(Boolean(getError("serviceDescription")))}
              />
            </Field>
          </Box>

          <Box gridColumn={{ md: "span 2" }}>
            <Field label="Working days" required error={getError("workingDays")}>
              <Flex gap="10px" wrap="wrap">
                {DAY_OPTIONS.map((day) => {
                  const isSelected = values.workingDays.includes(day.value);

                  return (
                    <Button
                      key={day.value}
                      type="button"
                      h="44px"
                      px="16px"
                      borderRadius="999px"
                      borderWidth="1px"
                      borderColor={
                        getError("workingDays")
                          ? "var(--danger)"
                          : isSelected
                            ? "rgba(23, 146, 208, 0.22)"
                            : "rgba(15, 23, 46, 0.14)"
                      }
                      bg={
                        isSelected
                          ? "rgba(23, 146, 208, 0.12)"
                          : "rgba(255, 255, 255, 0.9)"
                      }
                      color={isSelected ? "#126e9d" : "var(--text-secondary)"}
                      fontWeight="700"
                      _hover={{
                        bg: isSelected
                          ? "rgba(23, 146, 208, 0.16)"
                          : "rgba(255, 255, 255, 1)",
                      }}
                      onClick={() => handleDayToggle(day.value)}
                    >
                      {day.label}
                    </Button>
                  );
                })}
              </Flex>
            </Field>
          </Box>

          <Box gridColumn={{ md: "span 2" }}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, minmax(0, 1fr))" }}
              gap="16px"
            >
              <Field label="Hour start" required error={getError("hourStart")}>
                <Input
                  name="hourStart"
                  type="time"
                  step="900"
                  value={values.hourStart}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  h="56px"
                  {...getControlStyles(Boolean(getError("hourStart")))}
                />
              </Field>

              <Field label="Hour end" required error={getError("hourEnd")}>
                <Input
                  name="hourEnd"
                  type="time"
                  step="900"
                  value={values.hourEnd}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  h="56px"
                  {...getControlStyles(Boolean(getError("hourEnd")))}
                />
              </Field>

              <Field
                label="Slot duration"
                required
                error={getError("slotDuration")}
              >
                <Input
                  name="slotDuration"
                  type="time"
                  step="900"
                  min="00:15"
                  max="04:00"
                  value={values.slotDuration}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  h="56px"
                  {...getControlStyles(Boolean(getError("slotDuration")))}
                />
              </Field>
            </Grid>
          </Box>
        </Grid>
      </SectionCard>
    );
  };

  return (
    <Box
      as="section"
      bg="linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(244, 251, 255, 0.78))"
      border="1px solid rgba(146, 178, 216, 0.26)"
      borderRadius="30px"
      boxShadow="0 30px 80px rgba(65, 113, 167, 0.18)"
      p={{ base: "18px", md: "26px", xl: "30px" }}
      backdropFilter="blur(14px)"
    >
      <Box mb="20px">
        <Text
          fontSize={{ base: "34px", md: "42px" }}
          lineHeight="1.02"
          letterSpacing="-0.05em"
          fontWeight="800"
          color="var(--text-primary)"
          mb="10px"
        >
          {isRegister ? "Registrace" : "Přihlášení"}
        </Text>
        <Text color="var(--text-secondary)" fontSize="15px" lineHeight="1.7">
          {isRegister
            ? "Registrace je rozdělená do krátkých kroků, aby se vešla na obrazovku bez zbytečného scrollování."
            : "Použijte e-mail a heslo, které jste zadali při registraci."}
        </Text>

        <Flex gap="6px" align="center" flexWrap="wrap" mt="12px">
          <Text fontSize="14px" color="var(--text-secondary)">
            {isRegister ? "Máte účet?" : "Nemáte účet?"}
          </Text>
          <Button
            variant="plain"
            p="0"
            minW="auto"
            h="auto"
            fontSize="14px"
            fontWeight="800"
            color="var(--text-primary)"
            onClick={handleModeSwitch}
          >
            {isRegister ? "Přihlásit se" : "Vytvořit účet"}
          </Button>
        </Flex>
      </Box>

      <Stack as="form" onSubmit={formik.handleSubmit} gap="18px">
        {isRegister ? (
          <>
            <Flex gap="10px" wrap="wrap">
              {registerSteps.map((step) => (
                <StepChip
                  key={step.index}
                  isActive={registerStep === step.index}
                  isDone={registerStep > step.index}
                >
                  {step.label}
                </StepChip>
              ))}
            </Flex>

            {renderRegisterStep()}
          </>
        ) : (
          <SectionCard
            title="Vstup do účtu"
            description="Přihlášení zůstává rychlé a čisté. Stačí dva údaje."
          >
            <Grid templateColumns={{ base: "1fr" }} gap="16px">
              <Field label="Mail" required error={getError("email")}>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  placeholder="jana@bookio.cz"
                  h="56px"
                  {...getControlStyles(Boolean(getError("email")))}
                />
              </Field>

              <Field
                label="Password"
                required
                error={getError("password")}
                helper="8 až 32 ASCII znaků bez mezer."
              >
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                  placeholder="••••••••••••"
                  h="56px"
                  {...getControlStyles(Boolean(getError("password")))}
                />
              </Field>
            </Grid>
          </SectionCard>
        )}

        <Grid
          templateColumns={{
            base: "1fr",
            md: isRegister ? "1fr auto" : "1fr 1fr",
          }}
          gap="12px"
          alignItems="center"
        >
          {isRegister && registerStep > 0 ? (
            <Button
              type="button"
              h="56px"
              borderRadius="18px"
              variant="outline"
              borderColor="rgba(15, 23, 46, 0.14)"
              bg="rgba(255, 255, 255, 0.82)"
              color="var(--text-primary)"
              onClick={() => setRegisterStep((current) => Math.max(current - 1, 0))}
            >
              Zpět
            </Button>
          ) : null}

          {isRegister ? (
            registerStep < lastRegisterStep ? (
              <Button
                type="button"
                h="56px"
                borderRadius="18px"
                bg="linear-gradient(135deg, #1792d0 0%, #2fb7c7 100%)"
                color="white"
                fontWeight="800"
                onClick={handleNextRegisterStep}
              >
                Pokračovat
              </Button>
            ) : (
              <Button
                type="submit"
                h="56px"
                borderRadius="18px"
                bg="linear-gradient(135deg, #1792d0 0%, #2fb7c7 100%)"
                color="white"
                disabled={isSubmitting}
                fontWeight="800"
              >
                {isSubmitting ? "Odesílání..." : "Vytvořit účet"}
              </Button>
            )
          ) : (
            <>
              <Button
                type="submit"
                h="58px"
                borderRadius="18px"
                bg="linear-gradient(135deg, #1792d0 0%, #2fb7c7 100%)"
                color="white"
                disabled={isSubmitting}
                fontWeight="800"
              >
                {isSubmitting ? "Odesílání..." : "Přihlásit se"}
              </Button>

              <Button
                type="button"
                h="58px"
                variant="outline"
                borderRadius="18px"
                borderColor="rgba(15, 23, 46, 0.14)"
                bg="rgba(255, 255, 255, 0.82)"
                color="var(--text-primary)"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle />
                <Box as="span" ml="10px" fontWeight="700">
                  Pokračovat přes Google
                </Box>
              </Button>
            </>
          )}
        </Grid>

        {env.useMockAuth ? (
          <Box
            bg="rgba(255,255,255,0.72)"
            border="1px solid rgba(23, 146, 208, 0.14)"
            borderRadius="18px"
            p="16px"
          >
            <Text fontSize="13px" fontWeight="800" color="var(--text-primary)" mb="6px">
              Mock účty pro testování
            </Text>
            <Text fontSize="13px" color="var(--text-secondary)" lineHeight="1.6" mb="12px">
              `client@bookio.test` pro klienta a `provider@bookio.test` pro
              providera. Heslo je v mock režimu ignorované.
            </Text>
            <Flex gap="10px" wrap="wrap">
              <Button
                type="button"
                h="44px"
                borderRadius="14px"
                variant="outline"
                onClick={() => handleMockLogin("client")}
              >
                Přihlásit jako client
              </Button>
              <Button
                type="button"
                h="44px"
                borderRadius="14px"
                variant="outline"
                onClick={() => handleMockLogin("provider")}
              >
                Přihlásit jako provider
              </Button>
            </Flex>
          </Box>
        ) : null}

        {feedbackMessage ? (
          <Text
            color={
              feedbackMessage.toLowerCase().includes("úspěšně")
                ? "green.600"
                : "var(--danger)"
            }
            fontSize="12px"
            lineHeight="1.7"
          >
            {feedbackMessage}
          </Text>
        ) : null}
      </Stack>
    </Box>
  );
}
