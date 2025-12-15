"use client";
import { useState } from "react";

import Edit from "@/assets/pencil.svg";
import Add from "@/assets/plus.svg";
import Delete from "@/assets/trash.svg";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
  useUpdateTodoComplete,
} from "@/lib/tanstack/mutation/todo";
import { useDailyTodos } from "@/lib/tanstack/query/todo";
import { cn } from "@/utils/cn";

import { format, isSameDay } from "date-fns";

export default function TodoList({ selectedDate }: { selectedDate: Date }) {
  const dayKey = format(selectedDate, "yyyy-MM-dd");
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState<Record<number, string>>({});

  const { data: dailyTodo, isSuccess: isDailySuccess, refetch } = useDailyTodos(dayKey);
  if (isDailySuccess) {
    console.log("[오늘의 Todo]", dailyTodo);
  }
  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      console.log("Todo 삭제 성공");
      alert("Todo 삭제 되었습니다.");
      refetch();
    },
    onError: (error) => {
      alert("Todo 삭제 요청에 실패했어요.");
      console.error(error);
    },
  });
  const { mutate: updateCompeleteTodo } = useUpdateTodoComplete({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert("Todo 삭제 요청에 실패했어요.");
      console.error(error);
    },
  });
  const { mutate: createTodo } = useCreateTodo({
    onSuccess: () => {
      console.log("Todo 생성 성공");
      setNewTodo("");
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: () => {
      console.log("Todo 수정 성공");
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onEditChange = (todoId: number, value: string) => {
    setEditTodo((prev) => ({
      ...prev,
      [todoId]: value,
    }));
  };
  const isToday = isSameDay(selectedDate, new Date());
  if (!dailyTodo) return <p className="font-pretendard p-4 text-sm">Loading...</p>;

  return (
    <div className="font-pretendard ml-7">
      <div className="h-full">
        {isToday && (
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex">
              <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="border-primary-100 text-primary-200 ml-10 flex-1 rounded-[20px] border-2 p-1 pl-3 text-sm outline-none"
              />
              <button
                className="bg-primary-100 ml-12 rounded-[20px] border-2 p-1 text-xs text-white"
                onClick={() =>
                  createTodo({
                    content: newTodo,
                    date: format(new Date(), "yyyy-MM-dd"),
                  })
                }
              >
                <Add />
              </button>
            </div>
          </div>
        )}
        {dailyTodo.length === 0 && (
          <p className="p-4 pb-25 text-sm text-gray-500">할 일이 없습니다.</p>
        )}
        <div className="max-h-24 overflow-y-auto">
          {dailyTodo.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between px-4 py-2">
              <div className="flex">
                <button
                  className="border-primary-100 mt-1 ml-3 h-5 w-5 rounded-full border-2"
                  onClick={() => updateCompeleteTodo(todo.id)}
                ></button>
                <input
                  value={editTodo[todo.id] ?? todo.content}
                  onChange={(e) => onEditChange(todo.id, e.target.value)}
                  className={cn(
                    "text-primary-300 ml-3 flex-1 p-1 text-sm outline-none",
                    todo.complete && "text-gray-400 line-through"
                  )}
                />
                <button
                  className="ml-3 px-1"
                  onClick={() =>
                    updateTodo({
                      id: todo.id,
                      content: editTodo[todo.id] ?? todo.content,
                      date: format(selectedDate, "yyyy-MM-dd"),
                    })
                  }
                >
                  <Edit />
                </button>
                <button className="ml-3 px-1 text-red-500" onClick={() => deleteTodo(todo.id)}>
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
