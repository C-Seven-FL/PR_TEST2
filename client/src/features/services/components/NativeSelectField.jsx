import { Box } from "@chakra-ui/react";

export function NativeSelectField(props) {
  return (
    <Box
      as="select"
      w="100%"
      h="52px"
      px="14px"
      borderRadius="14px"
      border="1px solid var(--border-soft)"
      bg="white"
      color="var(--text-primary)"
      _focusVisible={{
        borderColor: "var(--brand-primary)",
        boxShadow: "0 0 0 3px rgba(80, 163, 220, 0.16)",
      }}
      {...props}
    />
  );
}
