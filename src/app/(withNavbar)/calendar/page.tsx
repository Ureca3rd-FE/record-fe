"use client";
import { useState } from "react";

import Logo from "@/assets/logo.svg";
import Calendar from "@/components/calendar/Calendar";
import TodoList from "@/components/calendar/TodoList";
import Button from "@/components/common/Button";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-12-09"));
  //console.log("selectedDate", selectedDate);

  return (
    <main className="bg-secondary-100 min-h-screen px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header>
        <Logo />
      </header>
      <div className="font-pretendard mt-6 rounded-xl bg-white/50 text-sm">
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <TodoList date={selectedDate} />

        <Button className="mt-6 rounded-xl py-4">일기 보기</Button>
      </div>
    </main>
  );
}
