import React, { useState } from 'react'
import {
  Box, Text, Button, Input, VStack, HStack, Separator, Badge,
  DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter,
  DialogCloseTrigger, DialogTitle, DialogBackdrop, DialogPositioner,
  DialogActionTrigger
} from '@chakra-ui/react'
import { Plus, ArrowLeft } from 'lucide-react'

const MOCK_SERVICE = {
  name: 'Autoservis Novák',
  category: 'Automechanik',
  description: 'Kompletní servis osobních vozů, diagnostika, výměna olejů a pneumatik.',
  operatingHours: [
    { days: 'Pondělí – Pátek', hours: '08:00 – 17:00' },
    { days: 'Sobota', hours: '09:00 – 12:00' },
    { days: 'Neděle', hours: 'Zavřeno' }
  ],
  address: 'Hlavní 123, 110 00 Praha 1',
  provider: {
    userID: 'u-0421',
    fullName: 'Jan Novák',
    email: 'jan.novak@autoservis.cz',
    phone: '+420 777 123 456'
  }
}

const EMPTY_FORM = { date: '', timeStart: '', timeEnd: '', note: '' }

const Field = ({ label, children }) => (
  <Box>
    <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb="1">{label}</Text>
    {typeof children === 'string' ? <Text fontSize="sm" color="gray.800">{children}</Text> : children}
  </Box>
)

export const ServiceModal = ({ open, onOpenChange, service = MOCK_SERVICE }) => {
  const [view, setView] = useState('info')
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleOpenChange = (e) => {
    if (!e.open) {
      setView('info')
      setForm(EMPTY_FORM)
    }
    onOpenChange(e)
  }

  const handleSave = () => {
    console.log('Nová rezervace:', { service: service.name, ...form })
    setForm(EMPTY_FORM)
    setView('info')
    onOpenChange({ open: false })
  }

  const goBack = () => {
    setForm(EMPTY_FORM)
    setView('info')
  }

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={handleOpenChange}
      placement={{ base: "bottom", md: "center" }}
      size={{ base: "full", md: "lg" }}
      motionPreset="slide-in-bottom"
    >
      <DialogBackdrop />
      <DialogPositioner zIndex="2500">
        <DialogContent
          rounded={{ base: "2xl 2xl 0 0", md: "2xl" }}
          p={{ base: "3", md: "4" }}
          bg="white"
          boxShadow="2xl"
          minW={{ base: "auto", md: "480px" }}
          w={{ base: "100%", md: "auto" }}
          maxH={{ base: "95vh", md: "auto" }}
          overflowY="auto"
        >
          <DialogHeader borderBottomWidth="1px" pb="4">
            <DialogTitle fontSize="xl" fontWeight="bold">
              {view === 'info' ? 'Informace o službě' : 'Nová rezervace'}
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>

          <DialogBody py="6">
            <VStack gap="4" align="stretch">
              <Box p="4" bg="blue.50" rounded="xl" border="1px solid" borderColor="blue.100">
                <HStack justify="space-between" align="start">
                  <Box>
                    <Text fontWeight="800" fontSize="lg" color="blue.700">{service.name}</Text>
                    <Text fontSize="sm" color="blue.600">{service.category}</Text>
                  </Box>
                  <Badge colorPalette="blue" fontSize="10px">SLUŽBA</Badge>
                </HStack>
              </Box>

              {view === 'info' ? (
                <>
                  <Field label="Popis">{service.description}</Field>

                  <Field label="Otevírací doba">
                    <VStack align="stretch" gap="1">
                      {service.operatingHours.map((row, i) => (
                        <HStack key={i} justify="space-between">
                          <Text fontSize="sm" color="gray.700">{row.days}</Text>
                          <Text fontSize="sm" fontWeight="bold" color="gray.800">{row.hours}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Field>

                  <Field label="Adresa">{service.address}</Field>

                  <Separator />

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb="2">
                      Provozovatel
                    </Text>
                    <Box p="3" bg="gray.50" rounded="lg" border="1px solid" borderColor="gray.200">
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">{service.provider.fullName}</Text>
                      <Text fontSize="sm" color="gray.600">{service.provider.email}</Text>
                      <Text fontSize="sm" color="gray.600">{service.provider.phone}</Text>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Field label="Datum">
                    <Input name="date" type="date" value={form.date} onChange={handleChange} />
                  </Field>
                  <HStack gap="3" align="stretch">
                    <Box flex="1">
                      <Field label="Od">
                        <Input name="timeStart" type="time" value={form.timeStart} onChange={handleChange} />
                      </Field>
                    </Box>
                    <Box flex="1">
                      <Field label="Do">
                        <Input name="timeEnd" type="time" value={form.timeEnd} onChange={handleChange} />
                      </Field>
                    </Box>
                  </HStack>
                  <Field label="Poznámka">
                    <Input name="note" placeholder="Volitelná poznámka..." value={form.note} onChange={handleChange} />
                  </Field>
                </>
              )}
            </VStack>
          </DialogBody>

          <DialogFooter gap="3">
            {view === 'info' ? (
              <>
                <DialogActionTrigger asChild>
                  <Button variant="ghost">Zavřít</Button>
                </DialogActionTrigger>
                <Button colorPalette="blue" fontWeight="bold" onClick={() => setView('reservation')}>
                  <Plus size={16} style={{ marginRight: 4 }} /> Nová rezervace
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={goBack}>
                  <ArrowLeft size={16} style={{ marginRight: 4 }} /> Zpět
                </Button>
                <Button colorPalette="blue" fontWeight="bold" onClick={handleSave}>Uložit</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}