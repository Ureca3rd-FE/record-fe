import CalendarPageSearch from "@/components/calendar/diary/CalendarPageSearch";
import { getTodayQuestion } from "@/services/question";

import { format } from "date-fns";

export default async function CalendarPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const dayKey = format(date, "yyyy-MM-dd");
  const { result } = await getTodayQuestion(dayKey);
  //TODO:일기가 없을시에는 상세 일기 페이지를 눌러도 넘어가지 않게 해야합니다.
  return <CalendarPageSearch selectedDate={date} question={result.question} />;
}
