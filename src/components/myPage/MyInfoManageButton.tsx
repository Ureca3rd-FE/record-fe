"use client";

import React from "react";

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  onClick?: () => void;
}

export default function MyInfoManageButton({ icon, label, count, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative h-20 w-28 justify-center rounded-xl bg-white/20 px-3 py-3 text-left text-white shadow backdrop-blur-sm"
    >
      <p className="h-8 text-xs font-semibold">{label}</p>

      {/* 아이콘 */}
      <div className="absolute bottom-1 left-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/40">
          {icon}
        </div>
      </div>

      {typeof count === "number" && (
        <span className="absolute right-3 bottom-2 text-base font-bold">{count}</span>
      )}
    </button>
  );
}
