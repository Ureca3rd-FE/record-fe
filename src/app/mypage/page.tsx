"use client";

import FollowIcon from "@/assets/follow.svg";
import FollowingIcon from "@/assets/following.svg";
import FriendImage from "@/assets/friendImage.svg";
import Logo from "@/assets/logo.svg";
import NotebookIcon from "@/assets/notebook.svg";
import Profile from "@/assets/profile.svg";
import StatisticsIcon from "@/assets/statistics.svg";
import Navbar from "@/components/common/Navbar";
import ActionInnerButton from "@/components/myPage/ActionInnerButton";
import MyInfoManageButton from "@/components/myPage/MyInfoManageButton";
import { useMyInfo } from "@/hooks/useMyInfo";

export default function MyPage() {
  const { data, isLoading, error } = useMyInfo();
  return (
    <div className="min-h-screen bg-[#f3e5d0] pb-28">
      {/* 상단 갈색  */}
      <div className="from-primary-200 rounded-b-[40px] bg-linear-[225deg] to-[#B79182] px-6 pt-10 pb-10 text-white shadow-md">
        {/* 로고 */}
        <div className="mb-6">
          <Logo className="h-auto w-20" />
        </div>

        {/* 프로필 카드 */}
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white/20 p-4 shadow backdrop-blur-sm">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-white">
              {isLoading ? "로딩 중 ... " : data?.nickname}
            </p>
            <p className="mt-1 rounded bg-white/20 px-2 py-0.5 text-sm text-white">
              {isLoading ? "로딩 중 ... " : data?.email}
            </p>
          </div>
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">
            <Profile className="h-12 w-12" />
          </div>
        </div>

        {/* "내 정보 관리" */}
        <p className="mb-1 text-sm opacity-90">내 정보 관리</p>
        <div className="mb-4 h-[1px] w-full bg-white/40"></div>

        {/* 작은 카드 3개 */}
        <div className="flex justify-center gap-4">
          <MyInfoManageButton
            icon={<NotebookIcon className="size-4" />}
            label="작성한 일기"
            count={3}
          />
          <MyInfoManageButton
            icon={<FollowingIcon className="size-4" />}
            label="팔로잉"
            count={5}
          />
          <MyInfoManageButton icon={<FollowIcon className="size-4" />} label="팔로우" count={3} />
        </div>
      </div>

      {/* 아래 흰색 영역 */}
      <div className="mt-6 px-6">
        {/* 친구 초대하기 */}
        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-primary-200 mb-4 font-semibold">친구 초대하기</p>

          <input
            className="border-primary-200 w-full rounded-xl border p-3"
            placeholder="닉네임 검색하기"
          />

          <p className="text-primary-200 mt-3 flex items-center justify-center gap-2 text-sm">
            <FriendImage className="h-10 w-10" />
            <span>친구 추가는 친구가 가입한 id를 작성하면 찾을 수 있어!</span>
          </p>
        </div>

        {/* 큰 버튼 2개 */}
        <div className="mt-8 mb-2 grid grid-cols-2 gap-4">
          <ActionInnerButton icon={<StatisticsIcon className="size-8" />} label="통계 보러가기" />
          <ActionInnerButton icon={<NotebookIcon className="size-8" />} label="일기 작성하기" />
        </div>
      </div>

      <Navbar />
    </div>
  );
}
