import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { FollowApiItem } from "@/models/follow";

export const addFriend = async (myId: number, targetId: number): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.post(`/follows`, null, {
    params: {
      followerId: targetId,
      followingId: myId,
    },
  });
  return data;
};

export const removeFriend = async (
  myId: number,
  targetId: number
): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.delete(`/follows`, {
    params: {
      followerId: targetId,
      followingId: myId,
    },
  });
  return data;
};

export async function fetchFollowers(userId: number): Promise<FollowApiItem[]> {
  const { data } = await api.get("/follows/followers/" + userId);
  return data.result;
}

export async function fetchFollowings(userId: number): Promise<FollowApiItem[]> {
  const { data } = await api.get("/follows/following/" + userId);
  return data.result;
}
