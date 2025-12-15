import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { DailyDiaryResponseDTO, MonthlyDiaryDTO } from "@/models/diaries";

export const getMonthlyDiaries = async (
  yearMonth: string
): Promise<BaseResponseDTO<MonthlyDiaryDTO[]>> => {
  const { data } = await api.get(`diaries/user?year-month=${yearMonth}`);
  return data;
};

export const getDailyDiary = async (
  date: string
): Promise<BaseResponseDTO<DailyDiaryResponseDTO>> => {
  const { data } = await api.get(`diaries/user/by-date?year-month-day=${date}`);
  return data;
};
//여기에 cn 사용 가능한지 질문하기
