import { Box, Skeleton } from "@chakra-ui/react";

export function ServiceCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="20px"
      border="1px solid var(--border-soft)"
      p="20px"
      minH="220px"
      boxShadow="var(--shadow-card)"
    >
      <Skeleton h="28px" w="110px" borderRadius="999px" mb="16px" />
      <Skeleton h="26px" w="70%" mb="10px" />
      <Skeleton h="14px" w="100%" mb="8px" />
      <Skeleton h="14px" w="88%" mb="28px" />
      <Skeleton h="14px" w="46%" mb="24px" />
      <Skeleton h="46px" w="100%" borderRadius="14px" />
    </Box>
  );
}
