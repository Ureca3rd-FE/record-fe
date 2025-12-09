"use client";

import { useEffect, useState } from "react";

import { getTodosByDate } from "@/services/mockTodo";
import type { Todo, TodoListProps } from "@/types/todo";
import { cn } from "@/utils/cn";

export default function TodoList({ date }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await getTodosByDate(date);
      setTodos(result);
    };
    fetch();
  }, [date]);

  if (!todos) return <p className="font-pretendard p-4 text-sm">Loading...</p>;

  return (
    <div className="font-pretendard ml-7">
      <div className="h-full">
        {todos.length === 0 && <p className="p-4 pb-25 text-sm text-gray-500">할 일이 없습니다.</p>}
        <div>
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between p-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">{todo.time}</span>
                <span className={cn(todo.complete && "text-gray-400 line-through")}>
                  {todo.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
