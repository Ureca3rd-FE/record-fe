import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO } from "@/models/user";
import { checkNickname, updateUserNickname } from "@/services/user";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";

export const useCheckNickname = (
  options?: UseMutationOptions<BaseResponseDTO<CheckNicknameResponseDTO>, AxiosError, string>
) => {
  return useMutation({
    mutationFn: checkNickname,
    ...options,
  });
};

export const useUpdateUserNickname = (
  options?: UseMutationOptions<BaseResponseDTO<void>, AxiosError, string>
) => {
  return useMutation({
    mutationFn: updateUserNickname,
    ...options,
  });
};
