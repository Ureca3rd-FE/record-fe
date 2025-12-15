"use client";

import { useMyInfo } from "@/lib/tanstack/query/user";

interface EmotionShareDayProps {
  today: string;
}

const getCalculatedShareDay = (createdAt: string | undefined, today: string) => {
  if (!createdAt) return 0;

  const createdAtDate = new Date(createdAt);
  const todayDate = new Date(today);
  const diffTime = Math.abs(todayDate.getTime() - createdAtDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays.toLocaleString("ko-KR");
};

export default function EmotionShareDay({ today }: EmotionShareDayProps) {
  const { data } = useMyInfo();
  const shareDay = getCalculatedShareDay(data?.result.createdAt, today);

  return (
    <p className="text-end">
      감정을 공유한지 <span className="text-xl">{shareDay}</span>일째
    </p>
  );
}
