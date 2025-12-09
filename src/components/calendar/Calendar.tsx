"use client";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import Image from "next/image";

import ChvLeft from "@/assets/chevronLeft.svg";
import ChvRight from "@/assets/chevronRight.svg";

import { ko } from "date-fns/locale";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import DatePicker from "react-datepicker";

const writingImg = "/dalbam/writing.webp";

const toYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function Calendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
}) {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const tempdiaryDates = ["2025-12-02", "2025-12-05", "2025-11-29"];
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return (
      <div className="text-primary-200 flex items-center justify-center gap-30">
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          <ChvLeft />
        </button>
        <span className="text-[14px] font-bold">
          {year}.{month}
        </span>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          <ChvRight />
        </button>
      </div>
    );
  };

  const isSixWeekMonth = (date: Date) => {
    const first = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 첫날 요일
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // 마지막 날짜

    // (첫 주에서 차지하는 빈칸 + 전체 일수) / 7
    const weeks = Math.ceil((first + last) / 7);

    return weeks === 6;
  };

  return (
    <div className="relative mt-6 flex justify-center rounded-lg p-1">
      <Image
        src={writingImg}
        alt={"일기 작성 이미지"}
        fill
        className="scale-60 object-contain opacity-40"
      />

      <DatePicker
        dateFormat="yyyy.MM.dd"
        minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
        selected={selectedDate}
        onChange={(d) => {
          if (d === null) return;

          onSelectDate(d);
        }}
        onMonthChange={(d) => {
          if (d === null) return;
          //console.log("trigger", d);
          const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
          onSelectDate(firstDay);
        }}
        inline //달력 고정(팝업이 아니도록)
        locale={ko}
        renderCustomHeader={CustomHeader}
        calendarClassName="!bg-white/0 p-4 !border-primary-100 !border-0 "
        dayClassName={(day) => {
          if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
            return "!bg-primary-200 !rounded-full !h-7 !w-12";
          }
          return "!text-primary-100 !w-12";
        }}
        renderDayContents={(day, dateObj) => {
          const d = dateObj.getDate();
          const isSixWeeks = isSixWeekMonth(dateObj);
          return (
            <div className="flex flex-col items-center">
              <span>{d}</span>
              {/* 공통 하단 공간 */}
              <span className={`m-4 flex ${isSixWeeks ? "h-1" : "h-3"} text-sm`}>
                {tempdiaryDates.includes(toYMD(dateObj)) ? "🎉" : ""}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}
