import React from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { daysOfWeek } from "../lib/calendarUtils";
import { ReservationBlock } from "./ReservationBlock";

export function CalendarGrid({ reservations }) {
  return (
    <Box overflowX="auto" pb={4}>
      <Grid
        templateColumns="100px repeat(24, minmax(45px, 1fr))"
        templateRows="repeat(8, 60px)"
        gap={0}
        minW="1200px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        {/* Header Row */}
        <GridItem
          colSpan={1}
          bg="gray.100"
          p={2}
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <Text fontWeight="bold" fontSize="sm" color="gray.600">
            Den / Čas
          </Text>
        </GridItem>
        {[...Array(24)].map((_, i) => (
          <GridItem
            key={`header-${i}`}
            colSpan={1}
            bg="gray.100"
            borderBottom="1px solid"
            borderColor="gray.300"
            borderRight="1px dashed"
            borderRightColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs" color="gray.500">
              {i % 2 === 0 ? `${i.toString().padStart(2, "0")}:00` : ""}
            </Text>
          </GridItem>
        ))}

        {/* Days and Empty Grid Cells */}
        {daysOfWeek.map((day, rIndex) => (
          <React.Fragment key={day}>
            <GridItem
              rowStart={rIndex + 2}
              colStart={1}
              bg="gray.50"
              p={2}
              borderBottom="1px solid"
              borderColor="gray.200"
              borderRight="1px solid"
              borderRightColor="gray.300"
              display="flex"
              alignItems="center"
            >
              <Text fontWeight="medium" fontSize="sm">
                {day}
              </Text>
            </GridItem>

            {[...Array(24)].map((_, cIndex) => (
              <GridItem
                key={`bg-${day}-${cIndex}`}
                rowStart={rIndex + 2}
                colStart={cIndex + 2}
                borderBottom="1px solid"
                borderColor="gray.100"
                borderRight="1px dashed"
                borderRightColor="gray.100"
              />
            ))}
          </React.Fragment>
        ))}

        {/* Reservations */}
        {reservations.map((res) => (
          <ReservationBlock key={res.id} reservation={res} />
        ))}
      </Grid>
    </Box>
  );
}
