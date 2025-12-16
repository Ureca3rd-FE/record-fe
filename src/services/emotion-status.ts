import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { EmotionStatusResponseDTO } from "@/models/emotion-status";

export const getEmotionStatus = async (
  yearMonth: string
): Promise<BaseResponseDTO<EmotionStatusResponseDTO>> => {
  const { data } = await api.get(`/emotion-status?year-month=${yearMonth}`);
  return data;
};
