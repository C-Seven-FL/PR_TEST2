import { Box } from "@chakra-ui/react";
import { Navbar } from "../navigation/Navbar";

export function AppShell({ children }) {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box
        as="main"
        // px={{ base: "16px", md: "24px", xl: "32px" }}
        // pb={{ base: "28px", md: "40px" }}
      >
        {children}
      </Box>
    </Box>
  );
}
