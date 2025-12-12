import { getDailyTodos } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";

export const useDailyTodos = (date: string) => {
  return useQuery({
    queryKey: ["todos", date],
    queryFn: () => getDailyTodos(date),
    enabled: !!date,
    select: (data) => {
      const idx: number[] = data?.result?.map((item) => item.id) ?? [];
      const todosContent: string[] = data?.result?.map((item) => item.content) ?? [];
      const todosComplete: boolean[] = data?.result?.map((item) => item.complete) ?? [];
      return {
        todosContent,
        todosComplete,
        idx,
      };
    },
  });
};
