import { addFriend, removeFriend } from "@/services/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddFriendMutation(myId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: number) => addFriend(myId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSearch"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}

export function useRemoveFriendMutation(myId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: number) => removeFriend(myId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSearch"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}
