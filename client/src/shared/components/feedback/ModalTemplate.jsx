import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export function ModalTemplate({
  isOpen,
  title,
  description,
  onClose,
  primaryActionLabel = 'Continue',
  onPrimaryAction,
  isPrimaryActionDisabled = false,
  maxW = '520px',
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <Flex
      position="fixed"
      inset="0"
      zIndex="1400"
      align={{ base: "flex-start", md: "center" }}
      justify="center"
      bg="rgba(20, 12, 7, 0.42)"
      backdropFilter="blur(8px)"
      px={{ base: "12px", md: "20px" }}
      py={{ base: "12px", md: "24px" }}
      overflowY="auto"
    >
      <Box
        w="full"
        maxW={maxW}
        maxH={{ base: "calc(100dvh - 24px)", md: "calc(100dvh - 48px)" }}
        bg="var(--surface-strong)"
        borderRadius="var(--radius-xl)"
        border="1px solid var(--border-soft)"
        boxShadow="var(--shadow-soft)"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Box
          px={{ base: '20px', md: '32px' }}
          pt={{ base: '20px', md: '32px' }}
          pb={{ base: '14px', md: '18px' }}
          borderBottom="1px solid rgba(215, 225, 238, 0.72)"
          flexShrink="0"
        >
          <Heading size="lg" mb="10px" letterSpacing="-0.03em">
            {title}
          </Heading>
          {description ? (
            <Text color="var(--text-secondary)" lineHeight="1.6">
              {description}
            </Text>
          ) : null}
        </Box>

        <Box
          px={{ base: '20px', md: '32px' }}
          py={{ base: '18px', md: '22px' }}
          overflowY="auto"
          flex="1"
          minH="0"
          overscrollBehavior="contain"
        >
          {children}
        </Box>

        <Flex
          justify="flex-end"
          gap="12px"
          px={{ base: '20px', md: '32px' }}
          py={{ base: '14px', md: '18px' }}
          borderTop="1px solid rgba(215, 225, 238, 0.72)"
          bg="rgba(255, 255, 255, 0.96)"
          flexShrink="0"
        >
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            bg="var(--brand-primary)"
            color="white"
            onClick={onPrimaryAction}
            _hover={{ bg: 'var(--brand-primary-hover)' }}
            disabled={isPrimaryActionDisabled}
          >
            {primaryActionLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}