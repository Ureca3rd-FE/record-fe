export interface SubmitDiaryRequestDTO {
  questionId: number;
  answer: string;
  emotion: string;
  date: string;
}

export interface SubmitDiaryResponseDTO {
  positive: string[];
  negative: string[];
  summary: string;
}

export interface UpdateDiaryRequestDTO {
  id: number;
  answer?: string;
  emotion?: string;
  date: string;
}

export interface DiaryDTO {
  id: number;
  userId: number;
  questionId: number;
  answer: string;
  emotion: number;
  date: string;
  createdAt: string;
  isPositive: boolean;
}
