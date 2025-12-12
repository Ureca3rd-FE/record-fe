import { getDailyTodos } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";

export const useDailyTodos = (date: string) => {
  return useQuery({
    queryKey: ["todos", date],
    queryFn: () => getDailyTodos(date),
    enabled: !!date,
    select: (data) => {
      return (
        data?.result?.map((item) => ({
          id: item.id,
          content: item.content,
          complete: item.complete,
        })) ?? []
      );
    },
  });
};
