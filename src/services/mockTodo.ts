import type { Todo } from "@/types/todo";

const mockTodos: Todo[] = [
  {
    id: "1",
    date: new Date("2025-12-09"),
    time: "09:00",
    content: "회의",
    complete: false,
  },
  {
    id: "2",
    date: new Date("2025-12-09"),
    time: "14:00",
    content: "헬스장 가기",
    complete: true,
  },
];
//TODO: Todo API연동

export const getTodosByDate = async (date: Date): Promise<Todo[]> => {
  return mockTodos.filter((t) => {
    const currentDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
    const mockDate = `${t.date.getFullYear()}.${t.date.getMonth()}.${t.date.getDate()}`;
    return currentDate === mockDate;
  });
};
