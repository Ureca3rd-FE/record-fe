"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import BackIcon from "@/assets/chevronLeft.svg";
import NextIcon from "@/assets/chevronRight.svg";
import Loader from "@/components/common/Loader";

import { addMonths, format, isSameMonth, subMonths } from "date-fns";

const TotalChart = dynamic(() => import("@/components/myPage/stats/TotalChart"), {
  ssr: false,
  loading: () => <Loader className="mx-auto size-10" />,
});

const DailyChart = dynamic(() => import("@/components/myPage/stats/DailyChart"), {
  ssr: false,
  loading: () => <Loader className="mx-auto size-10" />,
});

const today = new Date();

export default function Stats() {
  const [selectedMonth, setSelectedMonth] = useState(today);

  const router = useRouter();

  const formattedMonth = format(selectedMonth, "yyyy.MM");

  const onClickPreviousMonth = () => {
    setSelectedMonth(subMonths(selectedMonth, 1));
  };

  const onClickNextMonth = () => {
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  return (
    <main className="font-kotra-hope text-primary-200 space-y-4 px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header className="flex items-center justify-between">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <p className="text-2xl">통계</p>
        <div className="size-6" />
      </header>
      <section className="flex items-center justify-between">
        <p className="text-lg">{formattedMonth}</p>
        <div className="flex gap-1">
          <button onClick={onClickPreviousMonth}>
            <BackIcon />
          </button>
          <button
            className="disabled:text-primary-100"
            onClick={onClickNextMonth}
            disabled={isSameMonth(selectedMonth, today)}
          >
            <NextIcon />
          </button>
        </div>
      </section>
      <section className="space-y-2">
        <p className="text-xl">전체 통계</p>
        <TotalChart selectedMonth={selectedMonth} />
      </section>
      <section className="space-y-2">
        <p className="text-xl">일별 통계</p>
        <DailyChart selectedMonth={selectedMonth} />
      </section>
    </main>
  );
}
