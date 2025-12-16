import { addFriend, removeFriend } from "@/services/follow";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "..";

export function useAddFriendMutation(myId: number) {
  return useMutation({
    mutationFn: (targetId: number) => addFriend(myId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSearch"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}

export function useRemoveFriendMutation(myId: number) {
  return useMutation({
    mutationFn: (targetId: number) => removeFriend(myId, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSearch"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}
