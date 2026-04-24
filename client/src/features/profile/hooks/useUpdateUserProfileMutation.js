import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api/profileApi";

export function useUpdateUserProfileMutation(user, { onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateUserProfile(payload, user),
    onSuccess: async (profile) => {
      queryClient.setQueryData(["user-profile", user?.uid], profile);
      await queryClient.invalidateQueries({ queryKey: ["user-profile", user?.uid] });
      onSuccess?.(profile);
    },
  });
}