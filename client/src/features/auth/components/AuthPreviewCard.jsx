import { Box, Flex, Text } from "@chakra-ui/react";

export function AuthPreviewCard({ mode }) {
  const isRegister = mode === "register";

  return (
    <Box
      maxW="440px"
      bg="linear-gradient(160deg, rgba(15, 33, 64, 0.92), rgba(28, 86, 125, 0.92))"
      borderRadius="30px"
      px={{ base: "20px", md: "24px" }}
      py={{ base: "22px", md: "26px" }}
      boxShadow="0 28px 70px rgba(29, 63, 102, 0.22)"
      border="1px solid rgba(255, 255, 255, 0.12)"
    >
      <Flex align="center" justify="space-between" mb="18px">
        <Box>
          <Text color="white" fontWeight="800" fontSize="24px" mb="4px">
            Bookio
          </Text>
          <Text color="rgba(255, 255, 255, 0.68)" fontSize="13px">
            {isRegister ? "Co získáte po registraci" : "Co máte po přihlášení po ruce"}
          </Text>
        </Box>
        <Box
          px="12px"
          py="8px"
          borderRadius="999px"
          bg="rgba(255, 255, 255, 0.1)"
          color="white"
          fontSize="11px"
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="0.12em"
        >
          {isRegister ? "Bookio účet" : "Dashboard"}
        </Box>
      </Flex>

      <StackLine
        label={isRegister ? "Rezervace" : "Přehled"}
        value={
          isRegister
            ? "Správa termínů a dostupnosti na jednom místě"
            : "Okamžitý přístup ke kalendáři a rezervacím"
        }
      />
      {!isRegister ? (
        <StackLine
          label="Mock login"
          value="client@bookio.test / provider@bookio.test"
        />
      ) : null}
      <StackLine
        label={isRegister ? "Účet" : "Úpravy"}
        value={
          isRegister
            ? "Klient i provider používají stejný základ formuláře"
            : "Můžete pokračovat tam, kde jste skončili"
        }
      />
      <StackLine
        label={isRegister ? "Provider" : "Bezpečnost"}
        value={
          isRegister
            ? "Přidání první služby a pracovních dnů hned při registraci"
            : "Účet je chráněný přihlášenou session"
        }
      />
    </Box>
  );
}

function StackLine({ label, value }) {
  return (
    <Flex
      justify="space-between"
      gap="14px"
      py="12px"
      borderTop="1px solid rgba(255, 255, 255, 0.09)"
    >
      <Text
        color="rgba(255, 255, 255, 0.56)"
        fontSize="12px"
        textTransform="uppercase"
        letterSpacing="0.12em"
        fontWeight="700"
      >
        {label}
      </Text>
      <Text color="white" fontSize="14px" fontWeight="700" textAlign="right">
        {value}
      </Text>
    </Flex>
  );
}
