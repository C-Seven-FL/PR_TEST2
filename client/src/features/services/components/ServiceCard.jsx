import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuStar } from "react-icons/lu";
import {
  getServiceCategoryLabel,
  getServiceRatingText,
} from "../lib/servicePresentation";

export function ServiceCard({ service }) {
  return (
    <Box
      bg="white"
      borderRadius="20px"
      border="1px solid var(--border-soft)"
      p="20px"
      minH="220px"
      boxShadow="var(--shadow-card)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Stack gap="12px">
        <Box>
          <Text
            display="inline-flex"
            px="10px"
            py="6px"
            borderRadius="999px"
            bg="rgba(23, 146, 208, 0.10)"
            color="#126e9d"
            fontSize="12px"
            fontWeight="700"
            mb="12px"
          >
            {getServiceCategoryLabel(service)}
          </Text>
          <Heading size="md" letterSpacing="-0.03em" mb="8px">
            {service.name}
          </Heading>
          <Text color="var(--text-secondary)" lineHeight="1.65" fontSize="14px">
            {service.description || "Detail služby bude doplněný backendem."}
          </Text>
        </Box>

        <Flex align="center" gap="8px" color="var(--text-secondary)">
          <LuStar />
          <Text fontSize="14px" fontWeight="700">
            {getServiceRatingText(service.avg_rating)}
          </Text>
        </Flex>
      </Stack>

      <Button
        as={Link}
        to={`/services/${service.id}`}
        state={{ service }}
        mt="20px"
        h="46px"
        borderRadius="14px"
        bg="var(--brand-primary)"
        color="white"
        _hover={{ bg: "var(--brand-primary-hover)" }}
      >
        Zobrazit detail
      </Button>
    </Box>
  );
}
