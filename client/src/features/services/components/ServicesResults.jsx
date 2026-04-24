import { SimpleGrid } from "@chakra-ui/react";
import { ServiceCard } from "./ServiceCard";
import { ServiceCardSkeleton } from "./ServiceCardSkeleton";
import { ServicesEmptyState } from "./ServicesEmptyState";
import { ServicesPagination } from "./ServicesPagination";
import { getServiceId } from "../lib/servicePresentation";

export function ServicesResults({
  services,
  isLoading,
  currentPage,
  totalPages,
  onReset,
  onPreviousPage,
  onNextPage,
}) {
  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="18px">
        {Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (!services.length) {
    return <ServicesEmptyState onReset={onReset} />;
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="18px">
        {services.map((service) => (
          <ServiceCard key={getServiceId(service)} service={service} />
        ))}
      </SimpleGrid>

      <ServicesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />
    </>
  );
}
