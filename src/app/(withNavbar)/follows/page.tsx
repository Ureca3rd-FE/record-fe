"use client";

import { useState } from "react";

import ChevronLeft from "@/assets/chevronLeft.svg";
import Profile from "@/assets/profile.svg";

export default function Follow() {
  const [isFollower, setIsFollower] = useState(true);

  return (
    <div className="bg-secondary-100 min-h-screen pb-28">
      {/* 헤더부분 */}
      <div className="relative p-4 pt-10">
        <button className="text-primary-200 absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold">
          <ChevronLeft className="h-12 w-12" />
        </button>
        <div className="text-primary-200 text-center text-lg font-bold">광수링</div>
      </div>

      {/* 선 위 탭 */}
      <div className="flex border-b border-white/40">
        <div
          onClick={() => setIsFollower(true)}
          className={`flex-1 cursor-pointer py-3 text-center font-semibold ${
            isFollower ? "border-primary-200 border-b-2 text-black" : "text-primary-200/50"
          }`}
        >
          팔로워
        </div>
        <div
          onClick={() => setIsFollower(false)}
          className={`flex-1 cursor-pointer py-3 text-center font-semibold ${
            !isFollower ? "border-primary-200 border-b-2 text-black" : "text-primary-200/50"
          }`}
        >
          팔로잉
        </div>
      </div>

      <div className="px-5 py-4 text-sm font-semibold text-black">
        {isFollower ? "모든 팔로워" : "모든 팔로잉"}
      </div>

      <div className="px-5">
        {["Subinnee_", "zoo2giyomi", "gangsoomiwae", "chainsowman", "ddongjooa"].map((name, i) => (
          <div key={i} className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-primary-200 text-primary-200 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border bg-white">
                <Profile className="h-12 w-12" />
              </div>
              <span className="text-primary-200 text-[15px] font-bold">{name}</span>
            </div>
            <div className="text-primary-200 text-xl font-bold"> x </div>
          </div>
        ))}
      </div>
    </div>
  );
}
