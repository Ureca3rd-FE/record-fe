import { getDailyDiary, getMonthlyDiaries } from "@/services/calendar";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyDiaries = (yearMonth: string) => {
  return useQuery({
    queryKey: ["monthly-diaries", yearMonth],
    queryFn: () => getMonthlyDiaries(yearMonth),
    enabled: !!yearMonth,

    select: (data) => {
      const writtenEmotions: number[] = data?.result?.map((item) => item.emotion) ?? [];
      const writtenDates: string[] = data?.result?.map((item) => item.date) ?? [];
      return {
        writtenEmotions,
        writtenDates,
      };
    },
  });
};

export const useDailyDiary = (date: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["daily-diaries", date],
    queryFn: () => getDailyDiary(date),
    enabled,
    select: (data) => data?.result,
  });
};
