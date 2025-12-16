import { getEmotionStatus } from "@/services/emotion-status";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetEmotionStatus = (yearMonth: string) => {
  return useSuspenseQuery({
    queryKey: ["emotionStatus", yearMonth],
    queryFn: () => getEmotionStatus(yearMonth),
    select: (data) => data.result,
  });
};
