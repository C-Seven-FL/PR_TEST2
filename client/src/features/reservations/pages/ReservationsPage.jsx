import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { FullScreenPage } from '../../../shared/components/layout/FullScreenPage';

export function ReservationsPage() {
  return (
    <FullScreenPage>
      <Box
        w="100%"
        minH={{ base: 'calc(100vh - 130px)', md: 'calc(100vh - 140px)' }}
        bg="var(--auth-surface)"
        borderRadius="var(--radius-xl)"
        border="1px solid var(--border-soft)"
        p={{ base: '20px', md: '28px', xl: '36px' }}
        boxShadow="var(--shadow-card)"
      >
        <Heading size="xl" letterSpacing="-0.04em" mb="12px">
          Reservations
        </Heading>
        <Text color="var(--text-secondary)" lineHeight="1.7" mb="24px" maxW="760px">
          Full-width workspace for reservation list, creation flow and reservation statuses.
        </Text>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="16px">
          <Box gridColumn={{ base: 'auto', lg: 'span 2' }} minH="420px" bg="white" borderRadius="18px" border="1px solid var(--border-soft)" p="18px">
            <Heading size="md" mb="10px">
              Reservation table
            </Heading>
            <Text color="var(--text-secondary)">Hlavní prostor pro seznam rezervací a filtry.</Text>
          </Box>
          <Box minH="420px" bg="white" borderRadius="18px" border="1px solid var(--border-soft)" p="18px">
            <Heading size="md" mb="10px">
              Detail / quick create
            </Heading>
            <Text color="var(--text-secondary)">Postranní panel pro detail rezervace nebo rychlé vytvoření.</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </FullScreenPage>
  );
}
