import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";
import { fetchCategories, fetchServices } from "../api/servicesApi";
import { ServicesErrorState } from "../components/ServicesErrorState";
import { ServicesFilters } from "../components/ServicesFilters";
import { ServicesResults } from "../components/ServicesResults";
import { useServicesQuery } from "../hooks/useServicesQuery";
import {
  createServiceSearchParams,
  DEFAULT_SERVICE_FILTERS,
  normalizeServiceFilters,
} from "../lib/serviceSearchParams";

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilters = useMemo(
    () => normalizeServiceFilters(searchParams),
    [searchParams],
  );

  const [draftFilters, setDraftFilters] = useState(activeFilters);

  useEffect(() => {
    setDraftFilters(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    if (!searchParams.toString()) {
      setSearchParams(createServiceSearchParams(DEFAULT_SERVICE_FILTERS), {
        replace: true,
      });
    }
  }, [searchParams, setSearchParams]);

  const categoriesQuery = useQuery({
    queryKey: ["service-categories"],
    queryFn: fetchCategories,
  });

  const servicesQuery = useQuery({
    queryKey: ["services", activeFilters],
    queryFn: () => fetchServices(activeFilters),
  });

  const handleDraftChange = (event) => {
    const { name, value } = event.target;

    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setSearchParams(
      createServiceSearchParams({
        ...draftFilters,
        page: 1,
      }),
      { replace: false },
    );
  };

  const resetFilters = () => {
    setDraftFilters(DEFAULT_SERVICE_FILTERS);
    setSearchParams(createServiceSearchParams(DEFAULT_SERVICE_FILTERS), {
      replace: false,
    });
  };

  const handlePageChange = (nextPage) => {
    setSearchParams(
      createServiceSearchParams({
        ...activeFilters,
        page: nextPage,
      }),
      { replace: false },
    );
  };

  const { data: services = [], isLoading, isError } = useServicesQuery();

  //const services = servicesQuery.data?.data || [];
  const totalPages = servicesQuery.data?.total_pages || 1;
  const currentPage = servicesQuery.data?.current_page || 1;

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
        <Flex
          justify="space-between"
          align={{ base: "flex-start", lg: "flex-end" }}
          gap="18px"
          mb="28px"
          direction={{ base: "column", lg: "row" }}
        >
          <Box maxW="680px">
            <Heading size="xl" letterSpacing="-0.04em" mb="10px">
              Vyhledávání služeb
            </Heading>
            <Text color="var(--text-secondary)" lineHeight="1.7">
              Najděte službu podle názvu, kategorie nebo hodnocení
            </Text>
          </Box>
        </Flex>

        <ServicesFilters
          draftFilters={draftFilters}
          categories={categoriesQuery.data || []}
          isCategoriesLoading={categoriesQuery.isLoading}
          isCategoriesError={categoriesQuery.isError}
          isSubmitting={servicesQuery.isLoading}
          onChange={handleDraftChange}
          onSubmit={applyFilters}
        />

        {servicesQuery.isError ? (
          <ServicesErrorState onRetry={() => servicesQuery.refetch()} />
        ) : (
          <ServicesResults
            services={services}
            isLoading={servicesQuery.isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onReset={resetFilters}
            onPreviousPage={() => handlePageChange(currentPage - 1)}
            onNextPage={() => handlePageChange(currentPage + 1)}
          />
        )}
      </Box>
    </FullScreenPage>
  );
}
