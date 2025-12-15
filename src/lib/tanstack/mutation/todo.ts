import type { BaseResponseDTO } from "@/models/base";
import type { CreateTodoDTO, UpdateTodoCompleteDTO, UpdateTodoDTO } from "@/models/todo";
import { createTodo, deleteTodo, updateTodo, updateTodoComplete } from "@/services/todo";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";

export const useCreateTodo = (
  options?: UseMutationOptions<BaseResponseDTO<CreateTodoDTO>, AxiosError, CreateTodoDTO>
) => {
  return useMutation({
    mutationFn: createTodo,
    ...options,
  });
};

export const useUpdateTodo = (
  options?: UseMutationOptions<BaseResponseDTO<UpdateTodoDTO>, AxiosError, UpdateTodoDTO>
) => {
  return useMutation({
    mutationFn: updateTodo,
    ...options,
  });
};
export const useUpdateTodoComplete = (
  options?: UseMutationOptions<BaseResponseDTO<UpdateTodoCompleteDTO>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: updateTodoComplete,
    ...options,
  });
};

export const useDeleteTodo = (
  options?: UseMutationOptions<BaseResponseDTO<void>, AxiosError, number>
) => {
  return useMutation({
    mutationFn: deleteTodo,
    ...options,
  });
};
