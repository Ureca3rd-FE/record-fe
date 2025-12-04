"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Calendar from "@/assets/calendar-days.svg";
import Home from "@/assets/circle-user.svg";
import House from "@/assets/house.svg";
export default function Navbar() {
  const path = usePathname();
  const isActive = (route: string) => path === route;
  return (
    <nav className="align-items-center bg-primary-200 flex w-full">
      <Link
        href="/"
        className={`pd-2 flex flex-1 flex-col items-center justify-center pt-2 pb-2 ${isActive("/") ? "text-back-200" : "text-back-100"}`}
      >
        {" "}
        <House />
        <span>홈</span>
      </Link>
      <Link
        href="/calendar"
        className={`flex flex-1 flex-col items-center justify-center pt-2 pb-2 ${isActive("/calendar") ? "text-back-200" : "text-back-100"}`}
      >
        {" "}
        <Calendar />
        <span>달력</span>
      </Link>
      <Link
        href="/mypage"
        className={`flex flex-1 flex-col items-center justify-center pt-2 pb-2 ${isActive("/mypage") ? "text-back-200" : "text-back-100"}`}
      >
        {" "}
        <Home />
        <span>마이페이지</span>
      </Link>
    </nav>
  );
}
