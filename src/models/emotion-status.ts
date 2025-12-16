import type { DiaryEmotionStatusProps } from "@/types/emotion-status";

export interface EmotionStatusResponseDTO {
  positiveCount: number;
  negativeCount: number;
}

export interface MonthlyEmotionStatusResponseDTO extends EmotionStatusResponseDTO {
  diaries: DiaryEmotionStatusProps[];
}
