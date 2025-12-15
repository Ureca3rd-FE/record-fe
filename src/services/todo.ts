import api from "@/lib/axios";
import type { BaseResponseDTO } from "@/models/base";
import type { CreateTodoDTO, TodoDTO, UpdateTodoCompleteDTO, UpdateTodoDTO } from "@/models/todo";

export const getDailyTodos = async (date: string): Promise<BaseResponseDTO<TodoDTO[]>> => {
  const { data } = await api.get(`/todos?date=${date}`);
  return data;
};

export const createTodo = async (body: CreateTodoDTO): Promise<BaseResponseDTO<CreateTodoDTO>> => {
  const { data } = await api.post("/todos", body);
  return data;
};
//할일 수정(내용,날짜)
export const updateTodo = async (body: UpdateTodoDTO): Promise<BaseResponseDTO<UpdateTodoDTO>> => {
  const { id, content, date } = body;
  const { data } = await api.put(`/todos/${id}`, { content, date });
  return data;
};
//할일 수정(완료 상태)
export const updateTodoComplete = async (
  id: number
): Promise<BaseResponseDTO<UpdateTodoCompleteDTO>> => {
  const { data } = await api.put(`/todos/complete/${id}`);
  return data;
};

export const deleteTodo = async (id: number): Promise<BaseResponseDTO<void>> => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};
