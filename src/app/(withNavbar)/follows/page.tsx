"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CancleIcon from "@/assets/cancleIcon.svg";
import ChevronLeft from "@/assets/chevronLeft.svg";
import Profile from "@/assets/profile.svg";
import {
  useFollowersQuery,
  useFollowingsQuery,
  useRemoveFriendMutation,
} from "@/lib/tanstack/query/follow";
import { useMyInfo } from "@/lib/tanstack/query/user";
import { cn } from "@/utils/cn";

export default function Follow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [isFollower, setIsFollower] = useState(tab === "follower");

  const { data: myInfo } = useMyInfo();
  const myId = myInfo?.result.userId;

  const { data: followers = [] } = useFollowersQuery(myId);
  const { data: followings = [] } = useFollowingsQuery(myId);

  const removeFriend = useRemoveFriendMutation(myId!);

  const shownList = isFollower ? followers : followings;

  return (
    <div
      className="bg-secondary-100 min-h-screen"
      style={{ paddingBottom: "calc(var(--spacing-navbar) + 10px)" }}
    >
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 pt-10">
        <button type="button" className="text-primary-200" onClick={() => router.push("/myPage")}>
          <ChevronLeft />
        </button>

        <div className="text-primary-200 text-lg font-bold">{myInfo?.result.nickname}</div>

        <div className="size-6" />
      </header>

      {/* 선 위 탭 */}
      <div className="flex border-b border-white/40">
        <button
          type="button"
          onClick={() => {
            setIsFollower(false);
            router.replace("/follows?tab=following");
          }}
          className={cn(
            "flex-1 border-b-2 py-3 text-center font-semibold",
            !isFollower ? "border-primary-200 text-black" : "text-primary-200/50 border-transparent"
          )}
        >
          팔로잉
        </button>
        <button
          type="button"
          onClick={() => {
            setIsFollower(true);
            router.replace("/follows?tab=follower");
          }}
          className={cn(
            "flex-1 border-b-2 py-3 text-center font-semibold",
            isFollower ? "border-primary-200 text-black" : "text-primary-200/50 border-transparent"
          )}
        >
          팔로워
        </button>
      </div>

      {/* 섹션 타이틀 */}
      <div className="px-5 py-4 text-sm font-semibold text-black">
        {isFollower ? "모든 팔로워" : "모든 팔로잉"}
      </div>

      {/* 팔로잉/팔로우 리스트! */}
      <div className="px-5">
        {shownList.length === 0 ? (
          <div className="text-primary-200 text-center text-[15px] font-bold">
            {isFollower ? "팔로워" : "팔로잉"}가 없어요.
          </div>
        ) : (
          shownList.map((item) => {
            const name = isFollower ? item.followingNickname : item.followerNickname;

            const targetId = isFollower ? item.followingId : item.followerId;

            return (
              <div key={item.id} className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="border-primary-200 text-primary-200 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border bg-white">
                    <Profile className="h-12 w-12" />
                  </div>
                  <span className="text-primary-200 text-[15px] font-bold">{name}</span>
                </div>

                {!isFollower && (
                  <button type="button" onClick={() => removeFriend.mutate(targetId)}>
                    <CancleIcon className="text-primary-200 h-6 w-6" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
