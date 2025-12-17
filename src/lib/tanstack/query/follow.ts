import api from "@/lib/axios";
import { addFriend, removeFriend } from "@/services/follow";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FollowApiItem } from "./../../../models/follow";

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
    queryFn: async () => {
      const { data } = await api.get(`/follows/followers/${userId}`);
      return data.result;
    },
    enabled: typeof userId === "number",
  });
}

export function useFollowingsQuery(userId?: number) {
  return useQuery<FollowApiItem[]>({
    queryKey: ["followings", userId],
    queryFn: async () => {
      const { data } = await api.get(`/follows/following/${userId}`);
      return data.result;
    },
    enabled: typeof userId === "number",
  });
}
