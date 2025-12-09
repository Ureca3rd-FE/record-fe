"use client";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

import CryingImg from "@/assets/cryingImg.svg";
import GreatImg from "@/assets/greatImg.svg";
import HelloImg from "@/assets/helloImg.svg";
import WhatImg from "@/assets/whatImg.svg";
import WriteImg from "@/assets/writingImg.svg";

import { da, ko } from "date-fns/locale";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import DatePicker from "react-datepicker";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
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
      <div className="text-primary-200 flex items-center justify-center gap-12">
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          {"<"}
        </button>
        <span className="text-[14px] font-bold">
          {year}.{month}
        </span>
        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {">"}
        </button>
      </div>
    );
  };

  return (
    <div className="mt-10 flex h-[500px] justify-center rounded-lg p-1">
      <DatePicker
        dateFormat="yyyy.MM.dd"
        minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
        selected={selectedDate}
        onChange={setSelectedDate}
        inline //달력 고정(팝업이 아니도록)
        locale={ko}
        renderCustomHeader={CustomHeader}
        calendarClassName="!bg-white !bg-opacity-50 p-4 !border-primary-100 !border-2"
        dayClassName={(day) => {
          if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
            return "!bg-primary-200 !rounded-full !h-7 !w-7";
          }
          return "!text-primary-100";
        }}
        renderDayContents={(day, dateObj) => {
          const toYMD = (date: Date) => {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
          };

          const d = dateObj.getDate();

          const isSelected = selectedDate && selectedDate.toDateString() === dateObj.toDateString();
          return (
            <div className="flex flex-col items-center">
              <span>{d}</span>
              {/* 공통 하단 공간 */}
              <span className="m-4 flex h-4 text-sm">
                {tempdiaryDates.includes(toYMD(dateObj)) ? "🎉" : ""}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}
