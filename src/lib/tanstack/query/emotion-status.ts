import { getEmotionStatus, getMonthlyEmotionStatus } from "@/services/emotion-status";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetEmotionStatus = (yearMonth: string) => {
  return useSuspenseQuery({
    queryKey: ["emotionStatus", yearMonth],
    queryFn: () => getEmotionStatus(yearMonth),
    select: (data) => data.result,
  });
};

export const useGetMonthlyEmotionStatus = (yearMonth: string) => {
  return useSuspenseQuery({
    queryKey: ["monthlyEmotionStatus", yearMonth],
    queryFn: () => getMonthlyEmotionStatus(yearMonth),
    select: (data) => data.result,
  });
};
