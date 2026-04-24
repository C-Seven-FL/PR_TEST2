import React from 'react'
import {
  Box, Text, Button, DialogRoot, DialogContent, DialogHeader, 
  DialogBody, DialogFooter, DialogCloseTrigger, DialogTitle, 
  DialogBackdrop, DialogPositioner, DialogActionTrigger, VStack, Separator
} from '@chakra-ui/react'

export const ReservationModal = ({ open, onOpenChange, resData }) => {
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={onOpenChange}
      placement={{ base: "bottom", md: "center" }}
      size={{ base: "full", md: "md" }}
      motionPreset="slide-in-bottom"
    >
      <DialogBackdrop />
      <DialogPositioner zIndex="2500">
        <DialogContent
          rounded={{ base: "2xl 2xl 0 0", md: "2xl" }}
          p={{ base: "3", md: "4" }}
          bg="white"
          boxShadow="2xl"
          minW={{ base: "auto", md: "420px" }}
          w={{ base: "100%", md: "auto" }}
          maxH={{ base: "95vh", md: "auto" }}
        >
          <DialogHeader borderBottomWidth="1px" pb="4">
            <DialogTitle fontSize="xl" fontWeight="bold">
              {resData ? `Rezervace #${resData.id}` : 'Nová rezervace'}
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          
          <DialogBody py="6">
            <VStack gap="4" align="stretch">
              <Box p="4" bg="blue.50" rounded="xl" border="1px solid" borderColor="blue.100">
                <Text fontWeight="800" fontSize="lg" color="blue.700">Jan Novák</Text>
                <Text fontSize="sm" color="blue.600">
                  {resData ? resData.timeLabel : "Vyberte časový slot"}
                </Text>
              </Box>
              <Separator />
              <Text fontSize="xs" color="gray.400" textAlign="center">
                [ Dynamická logika (BUC) bude doplněna dle role uživatele ]
              </Text>
            </VStack>
          </DialogBody>

          <DialogFooter gap="3">
            <DialogActionTrigger asChild>
              <Button variant="ghost">Zrušit</Button>
            </DialogActionTrigger>
            <Button colorPalette="blue" fontWeight="bold">Uložit</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}