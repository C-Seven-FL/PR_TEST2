import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export function ServicesEmptyState({ onReset }) {
  return (
    <Box
      bg="white"
      border="1px solid var(--border-soft)"
      borderRadius="24px"
      py={{ base: "42px", md: "56px" }}
      px="20px"
      textAlign="center"
    >
      <Flex
        w="72px"
        h="72px"
        borderRadius="999px"
        mx="auto"
        mb="18px"
        bg="rgba(23, 146, 208, 0.10)"
        align="center"
        justify="center"
        color="#126e9d"
      >
        <LuSearch size="28px" />
      </Flex>
      <Heading size="md" mb="10px">
        Žádné služby neodpovídají vašemu hledání
      </Heading>
      <Text color="var(--text-secondary)" mb="20px">
        Zkuste jinou kombinaci názvu, kategorie nebo řazení.
      </Text>
      <Button borderRadius="14px" onClick={onReset}>
        Resetovat filtry
      </Button>
    </Box>
  );
}
