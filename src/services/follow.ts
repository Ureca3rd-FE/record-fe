import api from "@/lib/axios";
import { BaseResponseDTO } from "@/models/base";

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
