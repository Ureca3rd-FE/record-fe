import { addFriend, fetchFollowers, fetchFollowings, removeFriend } from "@/services/follow";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { FollowApiItem } from "./../../../models/follow";

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

      queryClient.invalidateQueries({ queryKey: ["followers", myId] });
      queryClient.invalidateQueries({ queryKey: ["followings", myId] });
    },
  });
}
export function useFollowersQuery(userId?: number) {
  return useQuery<FollowApiItem[]>({
    queryKey: ["followers", userId],
    queryFn: () => fetchFollowers(userId!),
    enabled: typeof userId === "number",
  });
}

export function useFollowingsQuery(userId?: number) {
  return useQuery<FollowApiItem[]>({
    queryKey: ["followings", userId],
    queryFn: () => fetchFollowings(userId!),
    enabled: typeof userId === "number",
  });
}
