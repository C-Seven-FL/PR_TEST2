import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";
import { getMockServiceById } from "../api/servicesApi";

export function ServiceDetailPage() {
  const location = useLocation();
  const { serviceId } = useParams();
  const service = location.state?.service || getMockServiceById(serviceId);

  if (!serviceId) {
    return <Navigate to="/services" replace />;
  }

  return (
    <FullScreenPage>
      <Box
        w="100%"
        minH={{ base: "calc(100vh - 130px)", md: "calc(100vh - 140px)" }}
        bg="var(--auth-surface)"
        borderRadius="var(--radius-xl)"
        border="1px solid var(--border-soft)"
        p={{ base: "20px", md: "28px", xl: "36px" }}
        boxShadow="var(--shadow-card)"
      >
        <Button as={Link} to="/services" variant="outline" borderRadius="14px" mb="22px">
          ← Zpět na hledání
        </Button>

        <Box
          bg="white"
          border="1px solid var(--border-soft)"
          borderRadius="24px"
          p={{ base: "20px", md: "28px" }}
        >
          <Stack gap="16px" maxW="760px">
            <Text
              display="inline-flex"
              w="fit-content"
              px="10px"
              py="6px"
              borderRadius="999px"
              bg="rgba(23, 146, 208, 0.10)"
              color="#126e9d"
              fontSize="12px"
              fontWeight="700"
            >
              {service?.category_name || service?.category || "Kategorie"}
            </Text>
            <Heading size="xl" letterSpacing="-0.04em">
              {service?.name || `Služba ${serviceId}`}
            </Heading>
            <Text color="var(--text-secondary)" lineHeight="1.8">
              {service?.description ||
                "Detail služby ještě není napojený na backendový endpoint. Tahle stránka je připravená jako cílový bod pro rezervační flow klienta."}
            </Text>

            <Flex
              gap="18px"
              wrap="wrap"
              pt="10px"
              borderTop="1px solid var(--border-soft)"
            >
              <Box>
                <Text fontSize="12px" textTransform="uppercase" color="var(--text-tertiary)">
                  Rating
                </Text>
                <Text fontWeight="700">
                  {typeof service?.avg_rating === "number"
                    ? `${service.avg_rating.toFixed(1)} / 5`
                    : "Zatím bez hodnocení"}
                </Text>
              </Box>
              <Box>
                <Text fontSize="12px" textTransform="uppercase" color="var(--text-tertiary)">
                  Stav
                </Text>
                <Text fontWeight="700">Připraveno pro rezervaci</Text>
              </Box>
            </Flex>

            <Button
              alignSelf="flex-start"
              h="48px"
              px="18px"
              borderRadius="14px"
              bg="var(--brand-primary)"
              color="white"
              _hover={{ bg: "var(--brand-primary-hover)" }}
            >
              Pokračovat k rezervaci
            </Button>
          </Stack>
        </Box>
      </Box>
    </FullScreenPage>
  );
}
