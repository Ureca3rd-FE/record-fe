import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type {
  DiaryDTO,
  SubmitDiaryRequestDTO,
  SubmitDiaryResponseDTO,
  UpdateDiaryRequestDTO,
} from "@/models/diary";

export const submitDiary = async (
  body: SubmitDiaryRequestDTO
): Promise<BaseResponseDTO<SubmitDiaryResponseDTO>> => {
  const { data } = await api.post("/diaries", body);
  return data;
};

export const updateDiary = async (
  body: UpdateDiaryRequestDTO
): Promise<BaseResponseDTO<UpdateDiaryRequestDTO>> => {
  const { id, answer, emotion, date } = body;
  const { data } = await api.put(`/diaries/${id}`, { answer, emotion, date });
  return data;
};

export const getDiaryByDate = async (date: string): Promise<BaseResponseDTO<DiaryDTO>> => {
  const { data } = await api.get(`/diaries/user/by-date?year-month-day=${date}`);
  return data;
};

export const deleteDiary = async (id: number): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.delete(`/diaries/${id}`);
  return data;
};
