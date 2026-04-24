import { GridItem, Text } from "@chakra-ui/react";

export function ReservationBlock({ reservation }) {
  return (
    <GridItem
      rowStart={reservation.dayIndex + 2}
      colStart={reservation.startCol}
      colEnd={reservation.endCol}
      bg="blue.500"
      color="white"
      borderRadius="md"
      m={1}
      p={2}
      boxShadow="sm"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: "blue.600", transform: "scale(1.02)" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text fontSize="xs" fontWeight="bold" noOfLines={1}>
        Rezervace #{reservation.id}
      </Text>
      <Text fontSize="2xs" opacity={0.8}>
        {reservation.rawStart} - {reservation.rawEnd}
      </Text>
    </GridItem>
  );
}
