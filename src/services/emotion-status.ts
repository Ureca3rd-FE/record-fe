import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type {
  EmotionStatusResponseDTO,
  MonthlyEmotionStatusResponseDTO,
} from "@/models/emotion-status";

export const getEmotionStatus = async (
  yearMonth: string
): Promise<BaseResponseDTO<EmotionStatusResponseDTO>> => {
  const { data } = await api.get(`/emotion-status?year-month=${yearMonth}`);
  return data;
};

export const getMonthlyEmotionStatus = async (
  yearMonth: string
): Promise<BaseResponseDTO<MonthlyEmotionStatusResponseDTO>> => {
  const { data } = await api.get(`/emotion-status/date?year-month=${yearMonth}`);
  return data;
};
