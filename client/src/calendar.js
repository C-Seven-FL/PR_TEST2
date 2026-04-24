
import React, { useState } from 'react';
import { Box, Flex, Grid, GridItem, Text, Button, Heading } from '@chakra-ui/react';

// 1. Mock data přesně podle zadání z PDF
const mockReservations = [
    { ID: 1, reservation_starts: "2026-04-01-16-00", reservation_end: "2026-04-01-18-00" },
    { ID: 2, reservation_starts: "2026-04-02-12-00", reservation_end: "2026-04-02-16-00" },
    { ID: 3, reservation_starts: "2026-04-03-10-00", reservation_end: "2026-04-03-12-00" },
    { ID: 4, reservation_starts: "2026-04-03-16-00", reservation_end: "2026-04-03-18-00" }
];

const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

// 2. Pomocná funkce pro parsování custom data formatu "YYYY-MM-DD-HH-mm"
const parseReservation = (res) => {
    const [startYear, startMonth, startDay, startHour] = res.reservation_starts.split('-');
    const [endYear, endMonth, endDay, endHour] = res.reservation_end.split('-');

    // Zjistíme index dne v týdnu (aby Pondělí = 0, Neděle = 6)
    const date = new Date(startYear, startMonth - 1, startDay);
    let dayIndex = date.getDay() - 1;
    if (dayIndex === -1) dayIndex = 6;

    return {
        id: res.ID,
        dayIndex: dayIndex,
        // +2 protože sloupec 1 je vyhrazen pro názvy dnů
        startCol: parseInt(startHour, 10) + 2,
        endCol: parseInt(endHour, 10) + 2,
        rawStart: `${startHour}:00`,
        rawEnd: `${endHour}:00`
    };
};

const CalendarRoute = () => {
    // Připravíme si zpracovaná data
    const parsedReservations = mockReservations.map(parseReservation);

    // State pro budoucí logiku přepínání týdnů
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2026-03-30'));

    return (
        <Box p={6} bg="white" minH="100vh">
            {/* --- HORNÍ PANEL --- */}
            <Flex justify="space-between" align="center" mb={6} p={4} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
                <Heading size="md" color="gray.700">Navbar / Kalendář (Duben 2026)</Heading>
                <Flex gap={3}>
                    <Button colorScheme="blue" variant="outline" size="sm">Předchozí týden</Button>
                    <Button colorScheme="blue" variant="outline" size="sm">Další týden</Button>
                    {/* Tlačítko pro budoucí integraci */}
                    <Button colorScheme="teal" size="sm">Export do kalendáře</Button>
                </Flex>
            </Flex>

            {/* --- KALENDÁŘ (CSS GRID) --- */}
            <Box overflowX="auto" pb={4}>
                <Grid
                    // 1 sloupec pro dny (100px) + 24 sloupců pro hodiny
                    templateColumns="100px repeat(24, minmax(45px, 1fr))"
                    // 1 řádek hlavička + 7 řádků pro dny
                    templateRows="repeat(8, 60px)"
                    gap={0}
                    minW="1200px"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                >
                    {/* 1. Hlavička s časovými bloky (00-02, 02-04 atd.) */}
                    <GridItem colSpan={1} bg="gray.100" p={2} borderBottom="1px solid" borderColor="gray.300">
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">Den / Čas</Text>
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
                            {/* Vypíšeme číslo jen každou sudou hodinu pro přehlednost */}
                            <Text fontSize="xs" color="gray.500">
                                {i % 2 === 0 ? `${i.toString().padStart(2, '0')}:00` : ''}
                            </Text>
                        </GridItem>
                    ))}

                    {/* 2. Vykreslení řádků (Dny v týdnu a podkladová mřížka) */}
                    {daysOfWeek.map((day, rIndex) => (
                        <React.Fragment key={day}>
                            {/* Název dne */}
                            <GridItem
                                rowStart={rIndex + 2} // +2 protože hlavička je řádek 1
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
                                <Text fontWeight="medium" fontSize="sm">{day}</Text>
                            </GridItem>

                            {/* Prázdné buňky mřížky pro zarovnání pozadí */}
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

                    {/* 3. Samotné REZERVACE - dynamicky umístěné na základě dat */}
                    {parsedReservations.map((res) => (
                        <GridItem
                            key={res.id}
                            rowStart={res.dayIndex + 2}
                            colStart={res.startCol}
                            colEnd={res.endCol}
                            bg="blue.500"
                            color="white"
                            borderRadius="md"
                            m={1} // Drobné odsazení, aby se blok nedotýkal čar mřížky
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
                                Rezervace #{res.id}
                            </Text>
                            <Text fontSize="2xs" opacity={0.8}>
                                {res.rawStart} - {res.rawEnd}
                            </Text>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CalendarRoute;