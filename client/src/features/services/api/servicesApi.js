import { buildApiUrl, env } from "../../../shared/config/env";
import { httpClient } from "../../../shared/lib/api/httpClient";


const PAGE_SIZE = 6;

const mockCategories = [
  { id: "beauty", name: "Beauty studio" },
  { id: "barber", name: "Barber / hair" },
  { id: "massage", name: "Masáže" },
  { id: "fitness", name: "Fitness / coaching" },
  { id: "wellness", name: "Wellness" },
  { id: "health", name: "Health care" },
];



const mockServices = [
  {
    id: "svc-1",
    name: "Studio Aurora",
    category: "beauty",
    category_name: "Beauty studio",
    description: "Péče o pleť a relaxační beauty procedury.",
    avg_rating: 4.8,
    created_at: "2026-04-10T10:00:00.000Z",
  },
  {
    id: "svc-2",
    name: "Barber North",
    category: "barber",
    category_name: "Barber / hair",
    description: "Pánský střih, úprava vousů a rychlé rezervace.",
    avg_rating: 4.6,
    created_at: "2026-04-11T08:00:00.000Z",
  },
  {
    id: "svc-3",
    name: "Relax Point",
    category: "massage",
    category_name: "Masáže",
    description: "Klasická, sportovní i relaxační masáž.",
    avg_rating: null,
    created_at: "2026-04-07T13:30:00.000Z",
  },
  {
    id: "svc-4",
    name: "Move Better",
    category: "fitness",
    category_name: "Fitness / coaching",
    description: "Osobní tréninky a movement coaching.",
    avg_rating: 4.9,
    created_at: "2026-04-12T09:15:00.000Z",
  },
  {
    id: "svc-5",
    name: "Well Spa",
    category: "wellness",
    category_name: "Wellness",
    description: "Wellness balíčky a menší privátní zóna.",
    avg_rating: 4.4,
    created_at: "2026-04-08T16:00:00.000Z",
  },
  {
    id: "svc-6",
    name: "Care Clinic",
    category: "health",
    category_name: "Health care",
    description: "Fyzioterapie a individuální konzultace.",
    avg_rating: 4.7,
    created_at: "2026-04-09T11:20:00.000Z",
  },
  {
    id: "svc-7",
    name: "Glow Rituals",
    category: "beauty",
    category_name: "Beauty studio",
    description: "Kosmetika a expresní ošetření během dne.",
    avg_rating: 4.5,
    created_at: "2026-04-06T17:00:00.000Z",
  },
  {
    id: "svc-8",
    name: "Fresh Fade",
    category: "barber",
    category_name: "Barber / hair",
    description: "Moderní barber koncept bez čekání.",
    avg_rating: null,
    created_at: "2026-04-13T07:40:00.000Z",
  },
  {
    id: "svc-9",
    name: "Body Reset",
    category: "massage",
    category_name: "Masáže",
    description: "Sportovní regenerace a recovery sessions.",
    avg_rating: 4.3,
    created_at: "2026-04-05T15:00:00.000Z",
  },
];

export const servicesApiConfig = {
  categoriesPath: env.categoryListPath,
  categoriesUrl: buildApiUrl(env.categoryListPath),
  listPath: env.serviceListPath,
  listUrl: buildApiUrl(env.serviceListPath),
};

function sortMockServices(services, sortBy) {
  const sorted = [...services];

  if (sortBy === "rating") {
    sorted.sort((left, right) => (right.avg_rating ?? -1) - (left.avg_rating ?? -1));
    return sorted;
  }

  sorted.sort(
    (left, right) =>
      new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );
  return sorted;
}

function createMockServiceResponse({ name_search, category_search, sort_by, page }) {
  const normalizedName = (name_search || "").trim().toLowerCase();
  const normalizedCategory = category_search || "";
  const normalizedSort = sort_by || "newest";
  const normalizedPage = Number(page) || 1;

  const filtered = mockServices.filter((service) => {
    const matchesName = normalizedName
      ? service.name.toLowerCase().includes(normalizedName)
      : true;
    const matchesCategory = normalizedCategory
      ? service.category === normalizedCategory
      : true;

    return matchesName && matchesCategory;
  });

  const sorted = sortMockServices(filtered, normalizedSort);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(normalizedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return {
    data: sorted.slice(startIndex, startIndex + PAGE_SIZE),
    total_pages: totalPages,
    current_page: currentPage,
  };
}

export async function fetchCategories() {
  if (env.useMockServices) {
    return mockCategories;
  }

  const { data } = await httpClient.get(servicesApiConfig.categoriesPath);
  return Array.isArray(data) ? data : data?.data || [];
}

export async function fetchServices(params) {
  if (env.useMockServices) {
    return createMockServiceResponse(params);
  }

  const { data } = await httpClient.get(servicesApiConfig.listPath, { params });
  return data;
}

export function getMockServiceById(serviceId) {
  return mockServices.find((service) => service.id === serviceId) || null;
}
