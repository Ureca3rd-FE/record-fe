import { useDeleteTodo } from "@/lib/tanstack/mutation/todo";
import { useDailyTodos } from "@/lib/tanstack/query/todo";
import { cn } from "@/utils/cn";

import { format } from "date-fns";

export default function TodoList({ selectedDate }: { selectedDate: Date }) {
  const dayKey = format(selectedDate, "yyyy-MM-dd");

  const { data: dailyTodo, isSuccess: isDailySuccess, refetch } = useDailyTodos(dayKey);
  if (isDailySuccess) {
    console.log("[오늘의 Todo]", dailyTodo);
  }
  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      console.log("삭제 성공");
      alert("Todo 삭제 되었습니다.");
      refetch();
    },
    onError: (error) => {
      alert("Todo 삭제 요청에 실패했어요.");
      console.error(error);
    },
  });

  if (!dailyTodo) return <p className="font-pretendard p-4 text-sm">Loading...</p>;

  return (
    <div className="font-pretendard ml-7">
      <div className="h-full">
        {dailyTodo.length === 0 && (
          <p className="p-4 pb-25 text-sm text-gray-500">할 일이 없습니다.</p>
        )}
        <div>
          {dailyTodo.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between px-4 py-2">
              <div className="flex">
                <span className={cn(todo.complete && "text-gray-400 line-through")}>
                  {todo.content}
                </span>
                <button
                  className="bg-secondary-100 ml-10 rounded-[20px] border-2 px-1 text-xs text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
