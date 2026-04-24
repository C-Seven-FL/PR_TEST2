import { Box, Button, Text } from "@chakra-ui/react";
import { LuRefreshCcw } from "react-icons/lu";

export function ServicesErrorState({ onRetry }) {
  return (
    <Box
      bg="rgba(255,255,255,0.86)"
      border="1px solid rgba(239, 107, 107, 0.20)"
      borderRadius="20px"
      p="20px"
      mb="24px"
    >
      <Text color="var(--danger)" fontWeight="700" mb="12px">
        Nepodařilo se načíst seznam služeb.
      </Text>
      <Button variant="outline" borderRadius="14px" onClick={onRetry}>
        <LuRefreshCcw />
        <Box as="span" ml="8px">
          Zkusit znovu
        </Box>
      </Button>
    </Box>
  );
}
