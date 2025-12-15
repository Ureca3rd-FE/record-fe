import type { BaseResponseDTO } from "@/models/base";
import type {
  SubmitDiaryRequestDTO,
  SubmitDiaryResponseDTO,
  UpdateDiaryRequestDTO,
} from "@/models/diary";
import { submitDiary, updateDiary } from "@/services/diary";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";

export const useSubmitDiary = (
  options?: UseMutationOptions<
    BaseResponseDTO<SubmitDiaryResponseDTO>,
    AxiosError,
    SubmitDiaryRequestDTO
  >
) => {
  return useMutation({
    mutationFn: submitDiary,
    ...options,
  });
};

export const useUpdateDiary = (
  options?: UseMutationOptions<BaseResponseDTO<void>, AxiosError, UpdateDiaryRequestDTO>
) => {
  return useMutation({
    mutationFn: updateDiary,
    ...options,
  });
};
