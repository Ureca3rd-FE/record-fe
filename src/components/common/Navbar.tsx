"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Calendar from "@/assets/calendarDays.svg";
import Home from "@/assets/circleUser.svg";
import House from "@/assets/house.svg";

export default function Navbar() {
  const path = usePathname();
  const navItems = [
    { href: "/", label: "홈", icon: <House /> },
    { href: "/calendar", label: "달력", icon: <Calendar /> },
    { href: "/mypage", label: "마이페이지", icon: <Home /> },
  ];
  return (
    <nav className="max-w-mobile align-items-center bg-primary-200 fixed bottom-0 mx-auto flex w-full">
      {navItems.map(({ href, label, icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center p-2 ${active ? "text-back-200" : "text-back-100"}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
