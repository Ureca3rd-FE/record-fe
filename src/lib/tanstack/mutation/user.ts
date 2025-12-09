import type { BaseResponseDTO } from "@/models/base";
import type { CheckNicknameResponseDTO } from "@/models/user";
import { checkNickname } from "@/services/user";
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
