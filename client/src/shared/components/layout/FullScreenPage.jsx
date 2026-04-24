import { Box } from "@chakra-ui/react";

export function FullScreenPage({
  children,
  background = "transparent",
  padded = true,
}) {
  return (
    <Box
      w="100%"
      minH={{ base: "calc(100vh - 110px)", md: "calc(100vh - 120px)" }}
      bg={background}
      px={padded ? { base: "0", md: "0" } : "0"}
    >
      {children}
    </Box>
  );
}
