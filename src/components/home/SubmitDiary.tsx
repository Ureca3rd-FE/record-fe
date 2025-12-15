"use client";

import { useState } from "react";

import { queryClient } from "@/lib/tanstack";
import { useSubmitDiary, useUpdateDiary } from "@/lib/tanstack/mutation/diary";
import { useGetDiaryByDate } from "@/lib/tanstack/query/diary";

import RequireLoginModal from "./RequireLoginModal";
import SummaryModal from "./SummaryModal";
import Button from "../common/Button";

interface SubmitDiaryProps {
  date: string;
  questionId: number;
}

const UNAUTHORIZED_ERROR_STATUS = 401;

const emotions = [
  {
    value: 1,
    label: "😞 매우 나쁨",
  },
  {
    value: 2,
    label: "😟 나쁨",
  },
  {
    value: 3,
    label: "😐 보통",
  },
  {
    value: 4,
    label: "😊 좋음",
  },
  {
    value: 5,
    label: "😍 매우 좋음",
  },
];

export default function SubmitDiary({ date, questionId }: SubmitDiaryProps) {
  const [isRequireLoginModalOpen, setIsRequireLoginModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const { data: diaryByDate } = useGetDiaryByDate(date);

  const defaultAnswer = diaryByDate?.result?.answer || "";
  const defaultEmotion = diaryByDate?.result?.emotion || "";

  const { mutate: updateDiary, isPending: isUpdatingDiary } = useUpdateDiary({
    onSuccess: () => {
      alert("일기 수정에 성공했어요.");
      queryClient.invalidateQueries({ queryKey: ["diaryByDate", date] });
    },
    onError: () => {
      alert("일기 수정 중 오류가 발생했어요.");
    },
    onSettled: () => {
      setIsSummaryModalOpen(false);
    },
  });

  const { mutate: submitDiary, isPending: isSubmittingDiary } = useSubmitDiary({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diaryByDate", date] });
      setIsSummaryModalOpen(false);
    },
    onError: (error) => {
      if (error.response?.status === UNAUTHORIZED_ERROR_STATUS) {
        setIsRequireLoginModalOpen(true);
        return;
      }

      alert("일기 작성 중 오류가 발생했어요.");
    },
  });

  const isPending = isSubmittingDiary || isUpdatingDiary;

  const onSubmitDiary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const answer = formData.get("answer");
    const emotion = formData.get("emotion");

    if (typeof answer !== "string") return;

    if (answer.length === 0) {
      return alert("답변을 작성해주세요.");
    }
    if (emotion === null || typeof emotion !== "string") {
      return alert("감정을 선택해주세요.");
    }

    // 일기를 이미 작성한 경우 수정 요청
    if (diaryByDate) {
      updateDiary({
        answer,
        emotion,
        date,
      });
      return;
    }

    setIsSummaryModalOpen(true);
    submitDiary({
      questionId,
      answer,
      emotion,
      date,
    });
  };

  return (
    <>
      <form
        key={`form-${defaultEmotion ?? "new"}`}
        onSubmit={onSubmitDiary}
        className="mt-6 space-y-6 text-sm"
      >
        <textarea
          name="answer"
          defaultValue={defaultAnswer}
          placeholder="답변을 작성해주세요."
          className="text-back-200 bg-primary-100 block h-80 w-full resize-none rounded-xl p-3 outline-none"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <label
                key={emotion.value}
                htmlFor={`emotion-${emotion.value}`}
                className="flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="emotion"
                  id={`emotion-${emotion.value}`}
                  value={emotion.value}
                  defaultChecked={defaultEmotion === emotion.value}
                />
                {emotion.label}
              </label>
            ))}
          </div>
        </div>
        <Button type="submit" className="rounded-xl py-4" disabled={isPending}>
          작성
        </Button>
      </form>
      <RequireLoginModal
        isOpen={isRequireLoginModalOpen}
        onClose={() => setIsRequireLoginModalOpen(false)}
      />
      <SummaryModal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} />
    </>
  );
}
