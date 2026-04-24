import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { AuthPreviewCard } from "../components/AuthPreviewCard";
import { ModalTemplate } from "../../../shared/components/feedback/ModalTemplate";
import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";

export function AuthPage() {
  const [mode, setMode] = useState("login");
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const isRegister = mode === "register";

  return (
    <FullScreenPage>
      <Box
        w="100%"
        minH={{ base: "calc(100vh - 130px)", md: "calc(100vh - 140px)" }}
        bg="linear-gradient(135deg, #eef8ff 0%, #dbeeff 46%, #eaf6f0 100%)"
        borderRadius="30px"
        px={{ base: "20px", md: "32px", xl: "48px" }}
        py={{ base: "24px", md: "34px", xl: "44px" }}
        boxShadow="0 28px 70px rgba(54, 90, 135, 0.18)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-120px"
          left="-80px"
          w="280px"
          h="280px"
          borderRadius="999px"
          bg="rgba(47, 183, 199, 0.18)"
          filter="blur(10px)"
        />
        <Box
          position="absolute"
          bottom="-140px"
          right="-40px"
          w="320px"
          h="320px"
          borderRadius="999px"
          bg="rgba(34, 91, 153, 0.16)"
          filter="blur(10px)"
        />

        <Grid
          templateColumns={{
            base: "1fr",
            xl: isRegister ? "1fr" : "minmax(0, 1fr) 360px",
          }}
          gap={{ base: "28px", xl: "34px" }}
          alignItems="start"
          maxW={isRegister ? "880px" : "1120px"}
          mx="auto"
          position="relative"
          zIndex="1"
        >
          <GridItem w="100%">
            <AuthForm
              mode={mode}
              onModeChange={setMode}
              onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
            />
          </GridItem>
          {!isRegister ? (
            <GridItem display={{ base: "none", xl: "block" }}>
              <AuthPreviewCard mode={mode} />
            </GridItem>
          ) : null}
        </Grid>
      </Box>

      <ModalTemplate
        isOpen={isGoogleModalOpen}
        title="Google přihlášení zatím není aktivní"
        description="Google OAuth flow je v aplikaci už připravený. Aby se tlačítko opravdu rozběhlo, stačí doplnit GOOGLE_CLIENT_ID a GOOGLE_CLIENT_SECRET do servers/user_service/.env."
        onClose={() => setIsGoogleModalOpen(false)}
        onPrimaryAction={() => setIsGoogleModalOpen(false)}
        primaryActionLabel="Rozumím"
      />
    </FullScreenPage>
  );
}
