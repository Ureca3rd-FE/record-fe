"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.svg";
import Calendar from "@/components/calendar/Calendar";
import TodoList from "@/components/calendar/TodoList";
import Button from "@/components/common/Button";
import { useMonthlyDiaries } from "@/lib/tanstack/query/calendar";

import { format } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthKey = format(selectedDate, "yyyy-MM");
  const dayKey = format(selectedDate, "yyyy-MM-dd");

  const router = useRouter();
  const { data: monthlyData } = useMonthlyDiaries(monthKey);

  console.log("[월별 조회 날짜들]", monthlyData?.writtenDates);
  console.log("[월별 조회 감정 점수들]", monthlyData?.writtenEmotions);

  const handleReadDiary = () => {
    router.push(`/calendar/diary/${dayKey}`);
  };

  return (
    <main className="bg-secondary-100 min-h-screen px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header className="text-primary-200">
        <Logo />
      </header>
      <div className="font-pretendard mt-6 rounded-xl bg-white/50 text-sm">
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          writtenDiaryDates={monthlyData?.writtenDates ?? []}
        />
        <TodoList selectedDate={selectedDate} />
        <Button className="mt-6 rounded-xl py-4" onClick={handleReadDiary}>
          일기 보기
        </Button>
      </div>
    </main>
  );
}
