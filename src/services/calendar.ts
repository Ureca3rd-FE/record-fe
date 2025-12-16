import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { MonthlyDiaryDTO } from "@/models/diaries";

export const getMonthlyDiaries = async (
  yearMonth: string
): Promise<BaseResponseDTO<MonthlyDiaryDTO[]>> => {
  const { data } = await api.get(`diaries/user?year-month=${yearMonth}`);
  return data;
};
