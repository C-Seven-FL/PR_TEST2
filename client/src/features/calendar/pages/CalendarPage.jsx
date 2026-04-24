import React, { useState } from 'react'
import { Box, Flex, Grid, GridItem, Text, Button, Heading, Image, HStack, VStack, Badge, useDisclosure } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, Plus, Info } from 'lucide-react'
import { ReservationModal } from '../components/reservationModal'
import { ServiceModal } from '../components/serviceModal'
import { MobileDayView } from '../components/mobileDayView'
import BookioLogo from '../assets/bookio-logo.png'

const mockReservations = [
  { ID: 1, reservation_starts: "2026-04-01-16-00", reservation_end: "2026-04-01-18-00" },
  { ID: 2, reservation_starts: "2026-04-02-12-00", reservation_end: "2026-04-02-16-00" },
  { ID: 3, reservation_starts: "2026-04-03-10-00", reservation_end: "2026-04-03-12-00" },
  { ID: 4, reservation_starts: "2026-04-03-16-00", reservation_end: "2026-04-03-18-00" }
]

const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle']
const hoursRange = Array.from({ length: 12 }, (_, i) => i + 8)
const BASE_MONDAY = new Date(2026, 2, 30)

const parseReservation = (res) => {
  const [sYear, sMonth, sDay, sHour] = res.reservation_starts.split('-')
  const eHour = res.reservation_end.split('-')[3]
  const date = new Date(sYear, sMonth - 1, sDay)
  let dayIndex = date.getDay() - 1
  if (dayIndex === -1) dayIndex = 6
  const startHr = parseInt(sHour, 10)
  const endHr = parseInt(eHour, 10)

  return {
    id: res.ID,
    dayCol: dayIndex + 2,
    startRow: startHr - 6,
    rowSpan: endHr - startHr,
    timeLabel: `${sHour}:00 - ${eHour}:00`
  }
}

const CalendarPage = () => {
  const { open, onOpen, onClose } = useDisclosure()
  const { open: serviceOpen, onOpen: onServiceOpen, onClose: onServiceClose } = useDisclosure()
  const [selectedRes, setSelectedRes] = useState(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay() - 1
    return today === -1 ? 6 : today
  })

  const weekStart = new Date(BASE_MONDAY)
  weekStart.setDate(BASE_MONDAY.getDate() + weekOffset * 7)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const getWeekDayInfo = (index) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + index)
    return {
      dayName: daysOfWeek[index],
      dateStr: `${date.getDate()}. ${date.getMonth() + 1}.`
    }
  }

  const headerDateRange = `${weekStart.getDate()}. ${weekStart.getMonth() + 1}. – ${weekEnd.getDate()}. ${weekEnd.getMonth() + 1}. ${weekEnd.getFullYear()}`

  const parsedReservations = mockReservations
    .filter(res => {
      const [y, m, d] = res.reservation_starts.split('-')
      const date = new Date(y, m - 1, d)
      return date >= weekStart && date <= weekEnd
    })
    .map(parseReservation)

  const handleOpenModal = (res) => {
    setSelectedRes(res)
    onOpen()
  }

  return (
    <Box p={{ base: "3", md: "6" }} bg="gray.50" minH="100vh">
      {/* HEADER */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "stretch", md: "center" }}
        gap={{ base: "3", md: "0" }}
        mb={{ base: "4", md: "6" }}
        p={{ base: "3", md: "4" }}
        bg="white"
        rounded="xl"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
      >
        <HStack gap={{ base: "3", md: "4" }}>
          <Image src={BookioLogo} alt="Logo" h={{ base: "32px", md: "40px" }} />
          <VStack align="start" gap="0">
            <Heading size={{ base: "sm", md: "md" }} fontWeight="800" color="gray.800">Bookio</Heading>
            <Text fontWeight="bold" color="blue.500" fontSize={{ base: "10px", md: "xs" }}>
              {headerDateRange}
            </Text>
          </VStack>
        </HStack>

        {/* Desktop action buttons */}
        <HStack gap="3" display={{ base: "none", md: "flex" }}>
          <Button variant="outline" size="sm" colorPalette="gray" onClick={() => setWeekOffset(w => w - 1)}><ChevronLeft size={16} /></Button>
          <Button variant="outline" size="sm" colorPalette="gray" onClick={() => setWeekOffset(w => w + 1)}><ChevronRight size={16} /></Button>
          <Button variant="outline" size="sm" colorPalette="gray" onClick={onServiceOpen}>
            <Info size={16} style={{marginRight: 4}} /> Info o službě
          </Button>
          <Button colorPalette="blue" size="sm" onClick={() => { setSelectedRes(null); onOpen() }}>
            <Plus size={16} style={{marginRight: 4}} /> Nová rezervace
          </Button>
        </HStack>

        {/* Mobile action buttons */}
        <HStack gap="2" display={{ base: "flex", md: "none" }} justify="stretch">
          <Button flex="1" variant="outline" size="sm" colorPalette="gray" onClick={onServiceOpen}>
            <Info size={14} style={{marginRight: 4}} /> Info
          </Button>
          <Button flex="1" colorPalette="blue" size="sm" onClick={() => { setSelectedRes(null); onOpen() }}>
            <Plus size={14} style={{marginRight: 4}} /> Rezervace
          </Button>
        </HStack>
      </Flex>

      {/* DESKTOP GRID */}
      <Box
        display={{ base: "none", md: "block" }}
        bg="white"
        p="4"
        rounded="xl"
        shadow="xl"
        border="1px solid"
        borderColor="gray.200"
        overflowX="auto"
      >
        <Grid templateColumns="80px repeat(7, 1fr)" templateRows="60px repeat(12, 70px)" minW="1000px">
          <GridItem gridColumn="1" gridRow="1" borderBottomWidth="1px" borderColor="gray.300" bg="gray.100" />
          {daysOfWeek.map((day, i) => {
            const info = getWeekDayInfo(i)
            return (
              <GridItem key={i} gridColumn={i + 2} gridRow="1" borderBottomWidth="1px" borderRightWidth="1px" borderColor="gray.200" bg="gray.50" textAlign="center" py="2">
                <Text fontWeight="800" fontSize="xs" color="gray.700" textTransform="uppercase">{info.dayName}</Text>
                <Text fontSize="10px" color="blue.600" fontWeight="bold">{info.dateStr}</Text>
              </GridItem>
            )
          })}

          {hoursRange.map((hour, i) => (
            <React.Fragment key={hour}>
              <GridItem gridColumn="1" gridRow={i + 2} borderRightWidth="1px" borderColor="gray.200" bg="gray.50" display="flex" justifyContent="center" pt="2">
                <Text fontSize="11px" fontWeight="bold" color="gray.400">{hour}:00</Text>
              </GridItem>
              {daysOfWeek.map((_, dayIdx) => (
                <GridItem key={dayIdx} gridColumn={dayIdx + 2} gridRow={i + 2} borderBottomWidth="1px" borderRightWidth="1px" borderColor="gray.100" />
              ))}
            </React.Fragment>
          ))}

          {parsedReservations.map((res) => (
            <GridItem
              key={res.id}
              gridColumn={res.dayCol}
              gridRow={`${res.startRow} / span ${res.rowSpan}`}
              bg="#2b6cb0" color="white" rounded="lg" m="1.5" p="3" zIndex="10" cursor="pointer"
              onClick={() => handleOpenModal(res)}
              _hover={{ bg: "#2c5282" }} shadow="md"
            >
              <VStack align="start" gap="1" h="full">
                <Badge bg="blue.400" color="white" fontSize="8px" px="1">POTVRZENO</Badge>
                <Text fontSize="xs" fontWeight="bold">Rezervace #{res.id}</Text>
                <Text fontSize="10px" fontWeight="bold" opacity={0.8}>{res.timeLabel}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* MOBILE AGENDA */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileDayView
          weekStart={weekStart}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          onPrevWeek={() => setWeekOffset(w => w - 1)}
          onNextWeek={() => setWeekOffset(w => w + 1)}
          reservations={parsedReservations}
          onOpenReservation={handleOpenModal}
        />
      </Box>

      <ReservationModal open={open} onOpenChange={(e) => { if (!e.open) onClose() }} resData={selectedRes} />
      <ServiceModal open={serviceOpen} onOpenChange={(e) => { if (!e.open) onServiceClose() }} />
    </Box>
  )
}

export default CalendarPage