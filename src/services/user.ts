import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO, MyInfo } from "@/models/user";

export const checkNickname = async (
  nickname: string
): Promise<BaseResponseDTO<CheckNicknameResponseDTO>> => {
  const { data } = await api.get(`/users/check-nickname?nickname=${nickname}`);
  return data;
};

export const updateUserNickname = async (nickname: string): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.put("/users/nickname", { nickname });
  return data;
};

export const getMyInfo = async (): Promise<BaseResponseDTO<MyInfo>> => {
  const { data } = await api.get("/users/me");
  return data;
};
