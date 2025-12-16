import api from "@/lib/axios";
import type { BaseResponseDTO, PaiginationDTO } from "@/models/base";
import type { CheckNicknameResponseDTO, MyInfoDto, SearchUserDto } from "@/models/user";

export const checkNickname = async (
  nickname: string
): Promise<BaseResponseDTO<CheckNicknameResponseDTO>> => {
  const { data } = await api.get("/users/check-nickname", {
    params: { nickname },
  });
  return data;
};

export const updateUserNickname = async (nickname: string): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.put("/users/nickname", {
    nickname,
  });
  return data;
};

export const getMyInfo = async (): Promise<BaseResponseDTO<MyInfoDto>> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const searchUsers = async (nickname: string): Promise<SearchUserDto[]> => {
  const { data } = await api.get<PaiginationDTO<SearchUserDto[]>>("/users/search", {
    params: {
      nickname,
      page: 0,
      size: 20,
    },
  });

  return data.result.data;
};
