"use client";

import { useState } from "react";

import RequireLoginModal from "./RequireLoginModal";
import SummaryModal from "./SummaryModal";
import Button from "../common/Button";

// 로그인 됐는지 안됐는지 상태 값
// 추후 실제 값으로 변경하기
const isAuthenticated = false;

export default function SubmitDiary() {
  const [isRequireLoginModalOpen, setIsRequireLoginModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const onSubmitDiary = () => {
    if (isAuthenticated) {
      // TODO: 일기 제출 API 연동
      setIsSummaryModalOpen(true);
      return;
    }

    // TODO: 로그인 유도 모달 띄우기
    setIsRequireLoginModalOpen(true);
  };

  return (
    <>
      <div className="mt-6 space-y-6 text-sm">
        <textarea
          placeholder="답변을 작성해주세요."
          className="text-back-200 bg-primary-100 block h-80 w-full resize-none rounded-xl p-3 outline-none"
        />
        <Button className="rounded-xl py-4" onClick={onSubmitDiary}>
          작성
        </Button>
      </div>
      <RequireLoginModal
        isOpen={isRequireLoginModalOpen}
        onClose={() => setIsRequireLoginModalOpen(false)}
      />
      <SummaryModal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} />
    </>
  );
}
