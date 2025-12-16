"use client";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";

import ChvLeft from "@/assets/chevronLeft.svg";
import ChvRight from "@/assets/chevronRight.svg";
import { cn } from "@/utils/cn";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import DatePicker from "react-datepicker";

const writingImg = "/dalbam/writing.webp";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  writtenDiaryDates: string[];
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  writtenDiaryDates = [],
}: CalendarProps) {
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
    const first = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
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
              <span className={cn("m-4 flex text-sm", isSixWeeks ? "h-1" : "h-3")}>
                {writtenDiaryDates.includes(format(dateObj, "yyyy-MM-dd")) ? "🎉" : ""}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}
