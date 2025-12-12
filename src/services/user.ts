import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO } from "@/models/user";

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

// 이메일, 닉네임 조회용!
export const getMyInfo = async () => {
  const res = await api.get("/users/me");
  return res.data.result;
};

// user_id로 친구 검색!
export const searchFriendByUserId = async (userId: string) => {
  const res = await api.get("/users/search", {
    params: { user_id: userId },
  });
  return res.data.result; // 검색된 유저 정보
};
