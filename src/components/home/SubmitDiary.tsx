"use client";

import Button from "../common/Button";

export default function SubmitDiary() {
  const onSubmitDiary = () => {
    // TODO: 일기 제출 API 연동
  };

  return (
    <div className="mt-6 space-y-6 text-sm">
      <textarea
        placeholder="답변을 작성해주세요."
        className="text-back-200 bg-primary-100 block h-80 w-full resize-none rounded-xl p-3 outline-none"
      />
      <Button className="rounded-xl py-4" onClick={onSubmitDiary}>
        작성
      </Button>
    </div>
  );
}
