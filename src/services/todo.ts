import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CreateTodoDTO, TodoDTO, UpdateTodoCompleteDTO, UpdateTodoDTO } from "@/models/todo";

export const getDailyTodos = async (date: string): Promise<BaseResponseDTO<TodoDTO[]>> => {
  const { data } = await api.get(`/todos?date=${date}`);
  return data;
};

export const createTodo = async (): Promise<BaseResponseDTO<CreateTodoDTO>> => {
  const { data } = await api.post("/todos");
  return data;
};
//할일 수정(내용,날짜)
export const updateTodo = async (
  id: number,
  content: string
): Promise<BaseResponseDTO<UpdateTodoDTO>> => {
  const { data } = await api.put(`/todos/${id}`, { content });
  return data;
};
//할일 수정(완료 상태)
export const updateTodoComplete = async (
  id: number
): Promise<BaseResponseDTO<UpdateTodoCompleteDTO>> => {
  const { data } = await api.put("/todos/complete/id", { id });
  return data;
};

export const degeleTodo = async (id: number): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.delete(`/todos/?id=${id}`);
  return data;
};
