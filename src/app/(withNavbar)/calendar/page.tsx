"use client";
import { useState } from "react";

import Logo from "@/assets/logo.svg";
import Calendar from "@/components/calendar/Calendar";
import TodoList from "@/components/calendar/TodoList";
import Button from "@/components/common/Button";
import { useDailyDiary, useMonthlyDiaries } from "@/lib/tanstack/query/calendar";

import { format } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shouldFetch, setShouldFetch] = useState(false);
  const monthKey = format(selectedDate, "yyyy-MM");
  const dayKey = format(selectedDate, "yyyy-MM-dd");

  const { data: monthlyData, isSuccess: isMonthlySuccess } = useMonthlyDiaries(monthKey);
  if (isMonthlySuccess) {
    console.log("[월별 조회 날짜들]", monthlyData.writtenDates);
    console.log("[월별 조회 감정 점수들]", monthlyData.writtenEmotions);
  }

  const { data: dailyDiary, isSuccess: isDailySuccess } = useDailyDiary(dayKey, shouldFetch);
  if (isDailySuccess) {
    console.log("[일별 조회 결과]", dailyDiary);
    Promise.resolve().then(() => setShouldFetch(false));
  }
  const handleReadDiary = () => {
    setShouldFetch(true);
  };

  return (
    <main className="bg-secondary-100 min-h-screen px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header>
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
