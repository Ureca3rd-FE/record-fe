import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO } from "@/models/user";

export const checkNickname = async (
  nickname: string
): Promise<BaseResponseDTO<CheckNicknameResponseDTO>> => {
  const { data } = await api.get(`/users/check-nickname?nickname=${nickname}`);
  return data;
};
