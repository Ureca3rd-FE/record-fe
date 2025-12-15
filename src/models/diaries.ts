export interface MonthlyDiaryDTO {
  id: number;
  questionId: number;
  date: string;
  emotion: number;
}

export interface DailyDiaryDTO extends MonthlyDiaryDTO {
  answer: string;
}

export type DailyDiaryResponseDTO = DailyDiaryDTO | null;
