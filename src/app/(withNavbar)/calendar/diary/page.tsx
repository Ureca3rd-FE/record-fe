"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useDailyDiary } from "@/lib/tanstack/query/calendar";

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const dayKey = searchParams.get("date");

  const { data: dailyDiary, isLoading, isError } = useDailyDiary(dayKey!);
  if (!dayKey) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>일기를 불러오지 못했습니다.</div>;
  }
  if (!dailyDiary?.id) {
    return <div>해당 날짜에 작성된 일기가 없습니다.</div>;
  }

  return (
    <div>
      <p>{dailyDiary.answer}</p>
    </div>
  );
}
