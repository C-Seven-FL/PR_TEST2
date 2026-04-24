import { Box, Heading, Spinner, Text, Flex, Button, Input, Textarea, VStack, HStack } from "@chakra-ui/react";
import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";
import { useDashboardSummaryQuery } from "../hooks/useDashboardSummaryQuery";
import { useState, useEffect } from "react";
import { Selector } from "../components/selector"

import {ServiceInfoPanel} from "../components/ServiceInfoPanel"

import { useServicesQuery } from "../hooks/useServicesQuery";
import { useQueryClient } from "@tanstack/react-query";

export function ProviderPage() {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const dashboardSummaryQuery = useDashboardSummaryQuery();
  const queryClient = useQueryClient();
  // const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null);


  const { data: services = [], isLoading, isError } = useServicesQuery();

  useEffect(() => {
    if (services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [services, selectedService]);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading services</div>;

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

            <Flex justify="space-between">
              <Selector 
                objectList={services} 
                placeholder="Select service" 
                maxW="300px"
                value={selectedService ? String(selectedService.id) : undefined}
                onValueChange={(e) => {
                  if (!e?.value) return;

                  const service = services.find(
                    s => String(s.id) === String(e.value)
                  );

                  if (service) {
                    setSelectedService(service);
                  }
                }}
              />

              <HStack>
                <Button colorScheme="blue">Add New Service</Button>
                <Button variant="outline">Close Service</Button>
              </HStack>
            </Flex>


            <Flex gap={6} align="stretch" color="white">

              
                <ServiceInfoPanel 
                  service={selectedService} 
                  onUpdated={() => {
                    queryClient.invalidateQueries(["services"]);
                  }}
                />
              

              <Box
                flex="2"
                bg="gray.800"
                p={4}
                borderRadius="xl"
              >
                <Heading size="sm" mb={4}>
                  Reservation panel
                </Heading>

                <Box h="100%" opacity={0.5}>
                </Box>
              </Box>

              <Box
              flex="1"
              bg="gray.800"
              p={4}
              borderRadius="xl"
            >
              <Flex justify="space-between" mb={4}>
                <Heading size="sm">Banned Clients</Heading>
                <Button size="xs">Ban Client</Button>
              </Flex>

              <Box
                h="400px"
                overflowY="auto"
                pr={2}
              >
                <VStack spacing={3} align="stretch">
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <Box
                      key={item}
                      p={3}
                      bg="gray.700"
                      borderRadius="lg"
                      _hover={{ bg: "gray.600" }}
                      transition="0.2s"
                      cursor="pointer"
                    >
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Heading size="xs">Client {item}</Heading>
                          <Box fontSize="sm" opacity={0.7}>
                            client@gmail.com
                          </Box>
                        </Box>

                        <Button size="xs" color="#cf0000" variant="ghost">
                          Remove
                        </Button>
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
