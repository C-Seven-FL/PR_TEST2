import React from 'react'
import { Box, Grid, GridItem, Text, HStack, VStack, Badge, Button } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const daysShort = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
const hoursRange = Array.from({ length: 12 }, (_, i) => i + 8)

export const MobileDayView = ({
  weekStart,
  selectedDay,
  onSelectDay,
  onPrevWeek,
  onNextWeek,
  reservations,
  onOpenReservation,
}) => {
  const dayReservations = reservations.filter(r => r.dayCol - 2 === selectedDay)

  const pickerDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return { index: i, label: daysShort[i], dateStr: `${date.getDate()}.${date.getMonth() + 1}.` }
  })

  return (
    <VStack align="stretch" gap="3">
      <HStack
        bg="white"
        p="3"
        rounded="xl"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        justify="space-between"
        gap="2"
      >
        <Button size="xs" variant="outline" colorPalette="gray" onClick={onPrevWeek} aria-label="Předchozí týden">
          <ChevronLeft size={14} />
        </Button>
        <HStack gap="1" overflowX="auto" flex="1" justify="center">
          {pickerDays.map(d => {
            const active = d.index === selectedDay
            return (
              <Button
                key={d.index}
                size="xs"
                variant={active ? 'solid' : 'ghost'}
                colorPalette={active ? 'blue' : 'gray'}
                onClick={() => onSelectDay(d.index)}
                minW="44px"
                h="44px"
                px="1"
              >
                <VStack gap="0">
                  <Text fontSize="10px" fontWeight="800">{d.label}</Text>
                  <Text fontSize="10px" fontWeight="bold" opacity={0.85}>{d.dateStr}</Text>
                </VStack>
              </Button>
            )
          })}
        </HStack>
        <Button size="xs" variant="outline" colorPalette="gray" onClick={onNextWeek} aria-label="Další týden">
          <ChevronRight size={14} />
        </Button>
      </HStack>

      <Box bg="white" p="3" rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">
        <Grid templateColumns="56px 1fr" templateRows="repeat(12, 64px)" position="relative">
          {hoursRange.map((hour, i) => (
            <React.Fragment key={hour}>
              <GridItem
                gridColumn="1"
                gridRow={i + 1}
                borderRightWidth="1px"
                borderColor="gray.200"
                bg="gray.50"
                display="flex"
                justifyContent="center"
                pt="2"
              >
                <Text fontSize="11px" fontWeight="bold" color="gray.400">{hour}:00</Text>
              </GridItem>
              <GridItem
                gridColumn="2"
                gridRow={i + 1}
                borderBottomWidth="1px"
                borderColor="gray.100"
              />
            </React.Fragment>
          ))}

          {dayReservations.map(res => (
            <GridItem
              key={res.id}
              gridColumn="2"
              gridRow={`${res.startRow - 1} / span ${res.rowSpan}`}
              bg="#2b6cb0"
              color="white"
              rounded="lg"
              m="1"
              p="2"
              zIndex="10"
              cursor="pointer"
              onClick={() => onOpenReservation(res)}
              _hover={{ bg: '#2c5282' }}
              _active={{ bg: '#2a4e7a' }}
              shadow="md"
            >
              <VStack align="start" gap="1" h="full">
                <Badge bg="blue.400" color="white" fontSize="9px" px="1.5">POTVRZENO</Badge>
                <Text fontSize="sm" fontWeight="bold">Rezervace #{res.id}</Text>
                <Text fontSize="11px" fontWeight="bold" opacity={0.9}>{res.timeLabel}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>

        {dayReservations.length === 0 && (
          <Text textAlign="center" fontSize="sm" color="gray.400" mt="3">
            Pro tento den nejsou žádné rezervace
          </Text>
        )}
      </Box>
    </VStack>
  )
}