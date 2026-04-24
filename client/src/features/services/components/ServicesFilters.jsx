import { Box, Button, Grid, Input, Text } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { NativeSelectField } from "./NativeSelectField";

export function ServicesFilters({
  draftFilters,
  categories,
  isCategoriesLoading,
  isCategoriesError,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <Box
      bg="white"
      border="1px solid var(--border-soft)"
      borderRadius="20px"
      p={{ base: "18px", md: "20px" }}
      mb="24px"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1.3fr 1fr 1fr auto" }}
        gap="14px"
        alignItems="end"
      >
        <Box>
          <Text fontSize="13px" fontWeight="700" mb="8px">
            Vyhledávání
          </Text>
          <Input
            name="name_search"
            value={draftFilters.name_search}
            onChange={onChange}
            placeholder="Hledat podle názvu..."
            h="52px"
            borderRadius="14px"
          />
        </Box>

        <Box>
          <Text fontSize="13px" fontWeight="700" mb="8px">
            Kategorie
          </Text>
          <NativeSelectField
            name="category_search"
            value={draftFilters.category_search}
            onChange={onChange}
            disabled={isCategoriesLoading}
          >
            <option value="">Všechny</option>
            {categories.map((category) => (
              <option
                key={category.id || category._id || category.slug || category.name}
                value={category.id || category._id || category.slug || category.name}
              >
                {category.name}
              </option>
            ))}
          </NativeSelectField>
        </Box>

        <Box>
          <Text fontSize="13px" fontWeight="700" mb="8px">
            Řadit podle
          </Text>
          <NativeSelectField
            name="sort_by"
            value={draftFilters.sort_by}
            onChange={onChange}
          >
            <option value="newest">Novější</option>
            <option value="rating">Rating</option>
          </NativeSelectField>
        </Box>

        <Button
          h="52px"
          px="22px"
          borderRadius="14px"
          bg="var(--brand-primary)"
          color="white"
          _hover={{ bg: "var(--brand-primary-hover)" }}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          <LuSearch />
          <Box as="span" ml="8px">
            Hledat
          </Box>
        </Button>
      </Grid>

      {isCategoriesError ? (
        <Text mt="12px" fontSize="13px" color="var(--danger)">
          Nepodařilo se načíst kategorie. Zkuste stránku obnovit.
        </Text>
      ) : null}
    </Box>
  );
}
