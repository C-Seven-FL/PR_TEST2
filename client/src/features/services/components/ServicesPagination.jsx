import { Button, Flex, Text } from "@chakra-ui/react";

export function ServicesPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <Flex mt="28px" justify="center" align="center" gap="14px" wrap="wrap">
      <Button
        h="48px"
        px="18px"
        borderRadius="14px"
        border="1px solid"
        borderColor="rgba(15, 23, 46, 0.14)"
        bg={isPreviousDisabled ? "rgba(255,255,255,0.72)" : "white"}
        color={
          isPreviousDisabled ? "rgba(82, 97, 122, 0.72)" : "var(--text-primary)"
        }
        _hover={{
          bg: isPreviousDisabled ? "rgba(255,255,255,0.72)" : "rgba(23, 146, 208, 0.06)",
        }}
        _disabled={{
          opacity: 1,
          cursor: "not-allowed",
          borderColor: "rgba(15, 23, 46, 0.10)",
          color: "rgba(82, 97, 122, 0.72)",
          bg: "rgba(255,255,255,0.72)",
        }}
        disabled={isPreviousDisabled}
        onClick={onPrevious}
      >
        ← Předchozí
      </Button>

      <Text fontWeight="700" color="var(--text-secondary)">
        Stránka {currentPage} z {totalPages}
      </Text>

      <Button
        h="48px"
        px="18px"
        borderRadius="14px"
        border="1px solid"
        borderColor={isNextDisabled ? "rgba(15, 23, 46, 0.10)" : "#1b2234"}
        bg={isNextDisabled ? "rgba(255,255,255,0.72)" : "#171923"}
        color={isNextDisabled ? "rgba(82, 97, 122, 0.72)" : "white"}
        _hover={{
          bg: isNextDisabled ? "rgba(255,255,255,0.72)" : "#0f1220",
        }}
        _disabled={{
          opacity: 1,
          cursor: "not-allowed",
          borderColor: "rgba(15, 23, 46, 0.10)",
          color: "rgba(82, 97, 122, 0.72)",
          bg: "rgba(255,255,255,0.72)",
        }}
        disabled={isNextDisabled}
        onClick={onNext}
      >
        Další →
      </Button>
    </Flex>
  );
}
