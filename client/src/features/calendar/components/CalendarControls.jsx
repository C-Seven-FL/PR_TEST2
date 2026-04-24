import { Flex, Heading, Button } from "@chakra-ui/react";

export function CalendarControls() {
  return (
    <Flex
      justify="space-between"
      align="center"
      mb={6}
      p={4}
      bg="gray.50"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <Heading size="md" color="gray.700">
        Navbar / Kalendář (Duben 2026)
      </Heading>
      <Flex gap={3}>
        <Button colorScheme="blue" variant="outline" size="sm">
          Předchozí týden
        </Button>
        <Button colorScheme="blue" variant="outline" size="sm">
          Další týden
        </Button>
        <Button colorScheme="teal" size="sm">
          Export do kalendáře
        </Button>
      </Flex>
    </Flex>
  );
}
