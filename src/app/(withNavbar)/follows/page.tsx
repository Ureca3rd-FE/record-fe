"use client";

import { useState } from "react";

import CancleIcon from "@/assets/cancleIcon.svg";
import ChevronLeft from "@/assets/chevronLeft.svg";
import Profile from "@/assets/profile.svg";
import { cn } from "@/utils/cn";

export default function Follow() {
  const [isFollower, setIsFollower] = useState(true);

  return (
    <div
      className="bg-secondary-100 min-h-screen"
      style={{
        paddingBottom: "calc(var(--spacing-navbar) + 10px)",
      }}
    >
      {/* 헤더부분 */}
      <header className="flex items-center justify-between px-4 pt-10">
        <button className="text-primary-200" aria-label="뒤로가기">
          <ChevronLeft className="h-12 w-12" />
        </button>

        <div className="text-primary-200 fogitnt-bold text-lg">광수링</div>
        <div className="size-6" />
      </header>

      {/* 선 위 탭 */}
      <div className="flex border-b border-white/40">
        <button
          type="button"
          onClick={() => setIsFollower(true)}
          className={cn(
            "flex-1 py-3 text-center font-semibold",
            "appearance-none bg-transparent",
            isFollower
              ? "border-primary-200 border-b-2 text-black"
              : "text-primary-200/50 border-b-2 border-transparent"
          )}
        >
          팔로워
        </button>

        <button
          type="button"
          onClick={() => setIsFollower(false)}
          className={cn(
            "flex-1 py-3 text-center font-semibold",
            "appearance-none bg-transparent",
            !isFollower
              ? "border-primary-200 border-b-2 text-black"
              : "text-primary-200/50 border-b-2 border-transparent"
          )}
        >
          팔로잉
        </button>
      </div>

      <div className="px-5 py-4 text-sm font-semibold text-black">
        {isFollower ? "모든 팔로워" : "모든 팔로잉"}
      </div>

      <div className="px-5">
        {["Subinnee_", "zoo2giyomi", "gangsoomiwae", "chainsowman", "ddongjooa"].map((name) => (
          <div key={name} className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-primary-200 text-primary-200 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border bg-white">
                <Profile className="h-12 w-12" />
              </div>
              <span className="text-primary-200 text-[15px] font-bold">{name}</span>
            </div>
            <div className="text-primary-200 font-bold">
              <CancleIcon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
