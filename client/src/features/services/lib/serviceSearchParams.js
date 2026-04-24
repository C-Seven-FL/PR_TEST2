export const DEFAULT_SERVICE_FILTERS = {
  name_search: "",
  category_search: "",
  sort_by: "newest",
  page: 1,
};

export function normalizeServiceFilters(searchParams) {
  const sortBy = searchParams.get("sort_by") || DEFAULT_SERVICE_FILTERS.sort_by;
  const pageValue = Number(searchParams.get("page") || DEFAULT_SERVICE_FILTERS.page);

  return {
    name_search: searchParams.get("name_search") || DEFAULT_SERVICE_FILTERS.name_search,
    category_search:
      searchParams.get("category_search") || DEFAULT_SERVICE_FILTERS.category_search,
    sort_by: sortBy === "rating" ? "rating" : DEFAULT_SERVICE_FILTERS.sort_by,
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
  };
}

export function createServiceSearchParams(filters) {
  const params = new URLSearchParams();

  if (filters.name_search) {
    params.set("name_search", filters.name_search);
  }

  if (filters.category_search) {
    params.set("category_search", filters.category_search);
  }

  if (filters.sort_by && filters.sort_by !== DEFAULT_SERVICE_FILTERS.sort_by) {
    params.set("sort_by", filters.sort_by);
  }

  if (filters.page && filters.page !== DEFAULT_SERVICE_FILTERS.page) {
    params.set("page", String(filters.page));
  }

  return params;
}
