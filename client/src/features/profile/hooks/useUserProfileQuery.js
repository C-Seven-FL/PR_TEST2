import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/profileApi";

export function useUserProfileQuery(user, options = {}) {
  return useQuery({
    queryKey: ["user-profile", user?.uid],
    queryFn: () => fetchUserProfile(user),
    enabled: Boolean(user?.uid) && (options.enabled ?? true),
    staleTime: 60_000,
  });
}