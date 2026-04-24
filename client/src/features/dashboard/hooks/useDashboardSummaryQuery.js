import { useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary } from "../api/dashboardApi";

export function useDashboardSummaryQuery() {
  return useQuery({
    // Query key by měl být stabilní a čitelný.
    // Díky tomu React Query správně pozná, kdy má použít cache
    // a kdy jde o jiný dataset.

    queryKey: ["dashboard", "summary"],

    // Query funkce má volat API helper, ne axios přímo uvnitř hooku nebo page komponenty.
    // Tohle rozdělení pomáhá udržet kód malý, přehledný a znovupoužitelný.
    queryFn: fetchDashboardSummary,

    // `staleTime` říká, jak dlouho považujeme data za čerstvá.
    // V tomhle případě minutu. Během této doby si React Query sahá do cache
    // a zbytečně neopakuje request při každém přerenderování nebo návratu na stránku.
    staleTime: 60 * 1000,
  });
}
