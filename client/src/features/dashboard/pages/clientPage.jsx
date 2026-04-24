import { Box, Heading, Footer, Spinner, Text, Flex, Button, Input, Textarea, VStack, HStack, SegmentGroup } from "@chakra-ui/react";
import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";
import { useDashboardSummaryQuery } from "../hooks/useDashboardSummaryQuery";
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { Selector } from "../components/selector"
import { Multiselector } from "../components/multiselector";


import { useAuth } from "../../../features/auth/context/AuthContext";


export function ClientPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showServices, setShowServices] = useState("Sponsor")
  const { isAuthenticated, user, role, signOut } = useAuth();
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const dashboardSummaryQuery = useDashboardSummaryQuery();

  const reservations_mock = [
    {id:1, name: "Grand Pa", category: "Restaurant", reservation_start_date: "11.04", reservation_start_time: "15:30"},
    {id:2, name: "Hotel California", category: "Hotel", reservation_start_date: "11.04", reservation_start_time: "17:30"},
    {id:3, name: "Doctor Green", category: "Medicine", reservation_start_date: "12.04", reservation_start_time: "08:00"},
  ]

  const sponsor_services_mock = [
    {id:4, name: "Style Hair", category: "Salon", rating: "4.7"},
    {id:5, name: "Thai Massage", category: "Massage", rating: "4.5"},
  ]

  const new_services_mock = [
    {id:6, name: "Big Bro", category: "Restaurant", rating: "5.0"},
    {id:7, name: "Blue Diving Seal", category: "Sport", rating: "-"},
  ]

  const [showContent, setShowContent] = useState(sponsor_services_mock)

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
        

        {dashboardSummaryQuery.isLoading ? (
          <Box
            minH="240px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="white"
            borderRadius="18px"
            border="1px solid var(--border-soft)"
          >
            <Spinner color="var(--brand-primary)" />
          </Box>
        ) : null}

        {dashboardSummaryQuery.isError ? (
          <Box
            minH="240px"
            bg="white"
            borderRadius="18px"
            border="1px solid var(--border-soft)"
            p="18px"
          >
            <Heading size="md" mb="10px">
              Dashboard data error
            </Heading>
            <Text color="var(--danger)" lineHeight="1.7">
              Nepodařilo se načíst dashboard summary. Zkontrolujte `.env` a
              backend endpoint.
            </Text>
          </Box>
        ) : null}

        {dashboardSummaryQuery.data ? (

            
          <Flex direction="column" gap={4} p={6}>


            <Flex gap={6} align="stretch" color="white">

              <Box
                flex="1"
                bg="gray.800"
                p={4}
                borderRadius="xl"
              >

              <Heading>
                <SegmentGroup.Root
                  value={showServices}
                  onValueChange={(e) => {
                    setShowServices(e.value)
                    if (e.value === "Sponsor") {setShowContent(sponsor_services_mock)}
                    else {setShowContent(new_services_mock)}
                  }}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={["Sponsor", "New"]} />
                </SegmentGroup.Root>
              </Heading>
                
              <Box
                h="400px"
                overflowY="auto"
                pr={2}
              >
                <VStack spacing={3} align="stretch" mt="2">
                  {showContent.map((item) => (
                    <Box
                      key={item.id}
                      p={3}
                      bg="gray.700"
                      borderRadius="lg"
                      _hover={{ bg: "gray.600" }}
                      transition="0.2s"
                      cursor="pointer"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Heading size="xl">{item.name}</Heading>
                          <Text size="sm" color="#d1d1d1">{item.category}</Text>
                        </Box>

                        <Box textAlign="right" >
                            <Box size="sm" color="#ffffff">{item.rating}</Box>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>

              </Box>

              <Box
                flex="2"
                bg="gray.800"
                p={4}
                borderRadius="xl"
              >

                <Box h="100%" borderRadius="lg" overflow="hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps?q=Prague&output=embed"
                  />
                </Box>
              </Box>

              <Box
              flex="1"
              bg="gray.800"
              p={4}
              borderRadius="xl"
            >
              <Flex justify="space-between" mb={4}>
                <Heading size="sm">Nearest Reservations</Heading>
              </Flex>

              <Box
                h="400px"
                overflowY="auto"
                pr={2}
              >
                <VStack spacing={3} align="stretch" mt="2">
                  {reservations_mock.map((item) => (
                    <Box
                      key={item.id}
                      p={3}
                      bg="gray.700"
                      borderRadius="lg"
                      _hover={{ bg: "gray.600" }}
                      transition="0.2s"
                      cursor="pointer"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Heading size="xl">{item.name}</Heading>
                          <Text size="sm" color="#d1d1d1">{item.category}</Text>
                        </Box>

                        <Box textAlign="right" >
                            <Box size="sm" color="#ffffff">{item.reservation_start_time}</Box>
                            <Box fontSize="10px" color="#d1d1d1">{item.reservation_start_date}</Box>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>
            </Flex>
          </Flex>
            
         
        ) : null}
      </Box>
    </FullScreenPage>
  );
}
