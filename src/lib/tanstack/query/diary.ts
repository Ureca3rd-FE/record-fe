import { getDiaryByDate } from "@/services/diary";
import { useQuery } from "@tanstack/react-query";

export const useGetDiaryByDate = (date: string) => {
  return useQuery({
    queryKey: ["diaryByDate", date],
    queryFn: () => getDiaryByDate(date),
  });
};
