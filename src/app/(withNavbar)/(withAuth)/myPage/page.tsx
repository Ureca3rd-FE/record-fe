"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FollowIcon from "@/assets/follow.svg";
import FollowingIcon from "@/assets/following.svg";
import Logo from "@/assets/logo.svg";
import NotebookIcon from "@/assets/notebook.svg";
import Profile from "@/assets/profile.svg";
import StatisticsIcon from "@/assets/statistics.svg";
import Navbar from "@/components/common/Navbar";
import ActionInnerButton from "@/components/myPage/ActionInnerButton";
import MyInfoManageButton from "@/components/myPage/MyInfoManageButton";
import { useAddFriendMutation, useRemoveFriendMutation } from "@/lib/tanstack/query/follow";
import { useMyInfo, useSearchUsers } from "@/lib/tanstack/query/user";
import { cn } from "@/utils/cn";

export default function MyPage() {
  const { data, isLoading } = useMyInfo();
  const myId = data?.result.userId ?? null;

  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { data: searchResults = [] } = useSearchUsers(keyword);

  const addFriend = useAddFriendMutation(myId ?? 0);
  const removeFriend = useRemoveFriendMutation(myId ?? 0);

  return (
    <div className="min-h-screen bg-[#f3e5d0] pb-28">
      {/* 상단 영역 */}
      <div className="from-primary-200 rounded-b-[40px] bg-linear-[225deg] to-[#B79182] px-6 pt-10 pb-10 text-white shadow-md">
        <div className="mb-6">
          <Logo className="h-auto w-20" />
        </div>

        {/* 프로필 카드 */}
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white/20 p-4 shadow backdrop-blur-sm">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-white">
              {isLoading ? "로딩중..." : data?.result.nickname}
            </p>
            <p className="mt-1 rounded bg-white/20 px-2 py-0.5 text-sm text-white">
              {isLoading ? "로딩중..." : data?.result.email}
            </p>
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
            <Profile className="h-12 w-12" />
          </div>
        </div>

        <p className="mb-1 text-sm opacity-90">내 정보 관리</p>
        <div className="mb-4 h-[1px] w-full bg-white/40" />

        <div className="flex justify-center gap-4">
          <MyInfoManageButton
            icon={<NotebookIcon className="size-4" />}
            label="작성한 일기"
            onClick={() => router.push("/calendar")}
          />
          <MyInfoManageButton
            icon={<FollowingIcon className="size-4" />}
            label="팔로잉"
            onClick={() => router.push("/follows?tab=following")}
          />

          <MyInfoManageButton
            icon={<FollowIcon className="size-4" />}
            label="팔로우"
            onClick={() => router.push("/follows?tab=follower")}
          />
        </div>
      </div>

      {/* 하단 흰색 영역 */}
      <div className="mt-6 px-6">
        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-primary-200 mb-4 font-semibold">친구 추가하기</p>

          {/* 검색창 */}
          <div className="relative">
            <input
              className="w-full rounded-xl border border-[#c9a98a] p-3 pr-10"
              placeholder="닉네임 검색하기"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-lg text-[#a98c72]">
              🔍
            </span>
          </div>

          {/* 검색 결과 */}
          {keyword.trim().length > 0 && (
            <div className="mt-4 border-t border-[#e5d5c3] pt-3">
              {searchResults.length === 0 && (
                <p className="py-3 text-center text-sm text-gray-500">검색 결과가 없습니다.</p>
              )}

              {searchResults.map((user) => {
                if (user.id === myId) return null;

                const isFollowed = user.isFollowed;

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border-b border-[#f0e7dd] px-2 py-3"
                  >
                    <div>
                      <p className="font-bold text-[#5e3b28]">{user.nickname}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={() =>
                        isFollowed ? removeFriend.mutate(user.id) : addFriend.mutate(user.id)
                      }
                      className={cn(
                        "rounded-lg px-4 py-1 text-sm text-white",
                        isFollowed ? "bg-[#c79c6c]" : "bg-[#a05a3a]"
                      )}
                    >
                      {isFollowed ? "제거" : "추가"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 mb-2 grid grid-cols-2 gap-4">
          <ActionInnerButton
            icon={<StatisticsIcon className="size-8" />}
            label="통계 보러가기"
            onClick={() => router.push("/myPage/stats")}
          />
          <ActionInnerButton
            icon={<NotebookIcon className="size-8" />}
            label="일기 작성하기"
            onClick={() => router.push("/todayDiary")}
          />
        </div>
      </div>

      <Navbar />
    </div>
  );
}
