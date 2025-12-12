"use client";
import { useState } from "react";

import { useDailyTodos } from "@/lib/tanstack/query/todo";
import { cn } from "@/utils/cn";

import { format } from "date-fns";

export default function TodoList({ selectedDate }: { selectedDate: Date }) {
  const dayKey = format(selectedDate, "yyyy-MM-dd");

  const { data: dailyTodo, isSuccess: isDailySuccess } = useDailyTodos(dayKey);
  if (isDailySuccess) {
    console.log("[오늘의 Todo 내용]", dailyTodo.todosContent);
    console.log("[오늘의 Todo 완료상태]", dailyTodo.todosComplete);
  }

  if (!dailyTodo) return <p className="font-pretendard p-4 text-sm">Loading...</p>;
  const todosContent = dailyTodo.todosContent;
  const todosComplete = dailyTodo.todosComplete;

  return (
    <div className="font-pretendard ml-7">
      <div className="h-full">
        {todosComplete.length === 0 && (
          <p className="p-4 pb-25 text-sm text-gray-500">할 일이 없습니다.</p>
        )}
        <div>
          {todosContent.map((content, idx) => (
            <div key={idx} className="flex items-center justify-between p-4">
              <div className="flex flex-col">
                <span className={cn(todosComplete[idx] && "text-gray-400 line-through")}>
                  {content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
