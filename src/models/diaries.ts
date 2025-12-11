export interface MonthlyDiaryDTO {
  id: number;
  questionId: number;
  date: string;
  emotion: number;
}

export interface DailyDiaryDTO {
  id: number;
  questionId: number;
  answer: string;
  emotion: number;
  date: string;
}

export interface MonthlyDiaryResponseDTO {
  isSuccess: boolean;
  code: number;
  message: string;
  result: MonthlyDiaryDTO[];
}

export type DailyDiaryResponseDTO = DailyDiaryDTO | null;
