import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ModalTemplate } from "../../../shared/components/feedback/ModalTemplate";
import { useAuth } from "../../auth/context/AuthContext";
import { useUserProfileQuery } from "../hooks/useUserProfileQuery";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";
import { validateProfileValues } from "../lib/profileValidation";

const FIELD_STYLES = {
  h: { base: "44px", md: "48px" },
  borderRadius: "14px",
  borderColor: "var(--border-soft)",
  bg: "rgba(255,255,255,0.96)",
  _hover: { borderColor: "var(--border-strong)" },
  _focusVisible: {
    borderColor: "var(--brand-primary)",
    boxShadow: "0 0 0 4px rgba(80, 163, 220, 0.18)",
  },
};

const initialValues = {
  name: "",
  mail: "",
  address: "",
  phone_number: "",
  notification_turn: true,
};

function isGoogleProviderUser(user) {
  if (!user) {
    return false;
  }

  if (user.isMockUser) {
    return false;
  }

  return Array.isArray(user.providerData)
    ? user.providerData.some((provider) => provider?.providerId === "google.com")
    : false;
}

function formatNotificationDate(value) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function ProfileField({ label, error, children, helper }) {
  return (
    <Box>
      <Text fontSize="13px" fontWeight="700" color="var(--text-primary)" mb="8px">
        {label}
      </Text>
      {children}
      {error ? (
        <Text mt="8px" fontSize="12px" color="var(--danger)">
          {error}
        </Text>
      ) : helper ? (
        <Text mt="8px" fontSize="12px" color="var(--text-tertiary)">
          {helper}
        </Text>
      ) : null}
    </Box>
  );
}

export function UserProfileModal({ isOpen, onClose }) {
  const { user, updateUserProfile: updateAuthProfile } = useAuth();
  const { data: profile, isPending, isError } = useUserProfileQuery(user, {
    enabled: isOpen,
  });
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const isEmailManagedByGoogle = isGoogleProviderUser(user);
  const fallbackEmail = user?.email || "";

  const updateProfileMutation = useUpdateUserProfileMutation(user, {
    onSuccess: (nextProfile) => {
      updateAuthProfile?.(nextProfile);
      setSubmitError("");
      onClose();
    },
  });

  useEffect(() => {
    if (!profile || !isOpen) {
      return;
    }

    setValues({
      name: profile.name || "",
      mail: profile.mail || fallbackEmail,
      address: profile.address || "",
      phone_number: profile.phone_number || "",
      notification_turn:
        typeof profile.notification_turn === "boolean"
          ? profile.notification_turn
          : true,
    });
    setErrors({});
    setSubmitError("");
  }, [fallbackEmail, profile, isOpen]);

  const isDirty = useMemo(() => {
    if (!profile) {
      return false;
    }

    return (
      values.name !== (profile.name || "") ||
      values.mail !== (profile.mail || fallbackEmail) ||
      values.address !== (profile.address || "") ||
      values.phone_number !== (profile.phone_number || "") ||
      values.notification_turn !==
        (typeof profile.notification_turn === "boolean"
          ? profile.notification_turn
          : true)
    );
  }, [fallbackEmail, profile, values]);

  const handleChange = (field) => (event) => {
    const nextValue = event.target.value;

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const handleToggleNotifications = () => {
    setValues((current) => ({
      ...current,
      notification_turn: !current.notification_turn,
    }));
  };

  const handleReset = () => {
    setValues({
      name: profile?.name || "",
      mail: profile?.mail || fallbackEmail,
      address: profile?.address || "",
      phone_number: profile?.phone_number || "",
      notification_turn:
        typeof profile?.notification_turn === "boolean"
          ? profile.notification_turn
          : true,
    });
    setErrors({});
    setSubmitError("");
  };

  const handleSubmit = async () => {
    const validationErrors = validateProfileValues(values);
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({
        name: values.name.trim(),
        mail: isEmailManagedByGoogle
          ? profile.mail || user?.email || ""
          : values.mail.trim().toLowerCase(),
        address: values.address.trim(),
        phone_number: values.phone_number.trim(),
        notification_turn: values.notification_turn,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Uložení profilu se nepodařilo. Zkuste to znovu.",
      );
    }
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Profil uživatele"
      description="Zde můžete upravit základní kontaktní informace, které Bookio používá v aplikaci."
      primaryActionLabel={updateProfileMutation.isPending ? "Ukládám..." : "Uložit změny"}
      onPrimaryAction={handleSubmit}
      isPrimaryActionDisabled={
        isPending || updateProfileMutation.isPending || !profile || !isDirty
      }
      maxW="640px"
    >
      {isPending ? (
        <Flex minH="220px" align="center" justify="center">
          <Spinner color="var(--brand-primary)" />
        </Flex>
      ) : isError || !profile ? (
        <Box
          borderRadius="18px"
          border="1px solid rgba(239, 107, 107, 0.2)"
          bg="rgba(239, 107, 107, 0.08)"
          p="16px"
        >
          <Text color="var(--text-primary)" fontWeight="700" mb="6px">
            Profil se nepodařilo načíst
          </Text>
          <Text color="var(--text-secondary)" fontSize="14px" lineHeight="1.6">
            Zkontrolujte připojení k backendu nebo si ověřte mock data.
          </Text>
        </Box>
      ) : (
        <Stack gap={{ base: "14px", md: "18px" }}>
          <Box
            borderRadius="18px"
            border="1px solid rgba(80, 163, 220, 0.16)"
            bg="rgba(235, 243, 255, 0.78)"
            p={{ base: "14px", md: "16px" }}
          >
            <Text fontSize="12px" fontWeight="800" color="#2f76a7" textTransform="uppercase">
              Přihlášený účet
            </Text>
            <Text mt="6px" fontSize="15px" fontWeight="700" color="var(--text-primary)">
              {profile.mail || user?.email || "Bez e-mailu"}
            </Text>
          </Box>

          <ProfileField label="Jméno" error={errors.name}>
            <Input
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Například Jan Novák"
              {...FIELD_STYLES}
            />
          </ProfileField>

          <ProfileField
            label="E-mail"
            error={errors.mail}
            helper={
              isEmailManagedByGoogle
                ? "Tento e-mail spravuje Google účet, proto ho zde nelze měnit."
                : "Použijeme ho pro přihlášení, potvrzení rezervací a notifikace."
            }
          >
            <Input
              value={values.mail}
              onChange={handleChange("mail")}
              placeholder="jan.novak@bookio.cz"
              disabled={isEmailManagedByGoogle}
              opacity={isEmailManagedByGoogle ? 0.72 : 1}
              {...FIELD_STYLES}
            />
          </ProfileField>

          <ProfileField
            label="Adresa"
            error={errors.address}
            helper="Volitelné pole pro kontaktní nebo fakturační adresu."
          >
            <Input
              value={values.address}
              onChange={handleChange("address")}
              placeholder="Ulice 123, Město"
              {...FIELD_STYLES}
            />
          </ProfileField>

          <ProfileField
            label="Telefon"
            error={errors.phone_number}
            helper="Telefonní číslo použijeme při rezervacích a kontaktování uživatele."
          >
            <Input
              value={values.phone_number}
              onChange={handleChange("phone_number")}
              placeholder="+420 777 123 456"
              {...FIELD_STYLES}
            />
          </ProfileField>

          <Box
            borderRadius="18px"
            border="1px solid rgba(120, 151, 193, 0.16)"
            bg="rgba(248, 251, 255, 0.94)"
            p={{ base: "14px", md: "16px" }}
          >
            <Flex
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap="14px"
              wrap="wrap"
              mb={profile.notifications?.length ? "16px" : "0"}
            >
              <Box>
                <Text fontSize="13px" fontWeight="800" color="var(--text-primary)">
                  Notifikace
                </Text>
                <Text fontSize="13px" color="var(--text-secondary)" mt="4px">
                  Povolit zasílání systémových upozornění a rezervačních změn.
                </Text>
              </Box>

              <Button
                size="sm"
                h="38px"
                px="14px"
                borderRadius="999px"
                bg={values.notification_turn ? "var(--brand-primary)" : "#edf2f7"}
                color={values.notification_turn ? "white" : "var(--text-secondary)"}
                border="1px solid"
                borderColor={
                  values.notification_turn ? "var(--brand-primary)" : "var(--border-soft)"
                }
                _hover={{
                  bg: values.notification_turn
                    ? "var(--brand-primary-hover)"
                    : "#e3eaf4",
                }}
                onClick={handleToggleNotifications}
              >
                {values.notification_turn ? "Zapnuto" : "Vypnuto"}
              </Button>
            </Flex>

            {profile.notifications?.length ? (
              <Stack gap="10px" maxH={{ base: "180px", md: "220px" }} overflowY="auto" pr="2px">
                {profile.notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    borderRadius="14px"
                    border="1px solid rgba(15, 23, 46, 0.08)"
                    bg={notification.read ? "white" : "rgba(80, 163, 220, 0.08)"}
                    p="12px"
                  >
                    <Flex justify="space-between" gap="12px" align="flex-start">
                      <Box>
                        <Text
                          fontSize="14px"
                          fontWeight={notification.read ? "600" : "700"}
                          color="var(--text-primary)"
                          lineHeight="1.5"
                        >
                          {notification.message}
                        </Text>
                        <Text fontSize="12px" color="var(--text-tertiary)" mt="6px">
                          {notification.read ? "Přečteno" : "Nepřečteno"}
                        </Text>
                      </Box>
                      <Text
                        fontSize="12px"
                        color="var(--text-tertiary)"
                        whiteSpace="nowrap"
                      >
                        {formatNotificationDate(notification.createdAt)}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text fontSize="13px" color="var(--text-tertiary)">
                Uživatel zatím nemá žádné notifikace.
              </Text>
            )}
          </Box>

          {submitError ? (
            <Box
              borderRadius="16px"
              border="1px solid rgba(239, 107, 107, 0.22)"
              bg="rgba(239, 107, 107, 0.08)"
              p="14px"
            >
              <Text fontSize="13px" color="var(--danger)">
                {submitError}
              </Text>
            </Box>
          ) : null}

          <Flex justify="space-between" align="center" gap="12px" wrap="wrap">
            <Text fontSize="12px" color="var(--text-tertiary)">
              Údaje se ukládají k vašemu uživatelskému účtu.
            </Text>

            {isDirty ? (
              <Button variant="ghost" onClick={handleReset}>
                Vrátit změny
              </Button>
            ) : null}
          </Flex>
        </Stack>
      )}
    </ModalTemplate>
  );
}