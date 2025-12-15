import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO, MyInfoDto, SearchUserDto } from "@/models/user";

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

export const getMyInfo = async (): Promise<BaseResponseDTO<MyInfoDto>> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const searchUsers = async (nickname: string): Promise<SearchUserDto[]> => {
  const trimmed = nickname.trim();
  if (!trimmed) return [];

  const { data } = await api.get("/users/search", {
    params: {
      nickname: trimmed,
      page: 0,
      size: 20,
    },
  });

  const result = data?.result;

  if (Array.isArray(result)) {
    return result as SearchUserDto[];
  }

  const candidate = result?.content ?? result?.data ?? result?.items ?? result?.list ?? null;

  if (Array.isArray(candidate)) {
    return candidate as SearchUserDto[];
  }
  return [];
};
