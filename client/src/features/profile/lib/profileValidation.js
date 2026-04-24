export function validateProfileValues(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Jméno je povinné.";
  } else if (values.name.trim().length > 128) {
    errors.name = "Jméno může mít maximálně 128 znaků.";
  }

  if (values.address.trim().length > 255) {
    errors.address = "Adresa může mít maximálně 255 znaků.";
  }

  if (!values.mail.trim()) {
    errors.mail = "E-mail je povinný.";
  } else {
    const normalizedEmail = values.mail.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      errors.mail = "E-mail musí mít platný formát.";
    }
  }

  if (values.phone_number.trim()) {
    const normalizedPhone = values.phone_number.trim();
    const isValidPhone = /^[+\d][\d\s()-]{6,20}$/.test(normalizedPhone);

    if (!isValidPhone) {
      errors.phone_number = "Telefon musí mít platný formát.";
    }
  }

  return errors;
}