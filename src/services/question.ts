import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { TodayQuestionDTO } from "@/models/question";

export const getTodayQuestion = async (
  yearMonthDay: string
): Promise<BaseResponseDTO<TodayQuestionDTO>> => {
  const { data } = await api.get(`/questions/by-date?year-month-day=${yearMonthDay}`);
  return data;
};
