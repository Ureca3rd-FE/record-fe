"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import BackIcon from "@/assets/chevronLeft.svg";
import { queryClient } from "@/lib/tanstack";
import { useDeleteDiary, useUpdateDiary } from "@/lib/tanstack/mutation/diary";
import { useGetDiaryByDate } from "@/lib/tanstack/query/diary";

import { format } from "date-fns";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
interface CalendarPageSearchProps {
  selectedDate: string;
  question: string;
}
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

export default function CalendarPageSearch({ selectedDate, question }: CalendarPageSearchProps) {
  const dayKey = format(selectedDate, "yyyy-MM-dd");
  const monthKey = format(selectedDate, "yyyy-MM");
  const day = format(selectedDate, "yyyy.MM.dd");

  const surprisedDalbam = "/dalbam/surprised.webp";
  const router = useRouter();

  const { data: diaryByDate } = useGetDiaryByDate(dayKey);
  const defaultAnswer = diaryByDate?.result?.answer || "";
  const defaultEmotion = diaryByDate?.result?.emotion || "";

  const { mutate: updateDiary } = useUpdateDiary({
    onSuccess: () => {
      setIsEditModalOpen(true);
      queryClient.invalidateQueries({ queryKey: ["diaryByDate", dayKey] });
    },
    onError: () => {
      alert("일기 수정 중 오류가 발생했어요.");
    },
  });
  const { mutate: deleteDiary } = useDeleteDiary({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["diaryByDate", dayKey] });
      queryClient.invalidateQueries({ queryKey: ["monthly-diaries", monthKey] });
      router.back();
    },
    onError: () => {
      alert("일기 삭제 중 오류가 발생했어요.");
    },
  });
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

    const id = diaryByDate?.result?.id;
    if (!id) return;

    updateDiary({
      id,
      body: {
        answer,
        emotion,
        date: dayKey,
      },
    });
  };

  const onDeleteDiary = () => {
    const id = diaryByDate?.result?.id;
    if (!id) return;
    deleteDiary(id);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <main className="font-kotra-hope text-primary-200 px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header className="flex items-center justify-between px-4">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <p className="text-2xl">세부 일기 페이지</p>
        <div className="size-6" />
      </header>
      <section>
        <div className="mt-10 flex items-center">
          <div className="bg-primary-100 h-px flex-1" />
          <span className="items-center text-lg">{day}</span>
          <div className="bg-primary-100 h-px flex-1" />
        </div>
        <div>
          <div className="mt-2 flex items-center justify-center text-xl">{question}</div>
          <div className="mt-2 flex items-center justify-center">
            {emotions.find((e) => e.value === defaultEmotion)?.label.split(" ")[0]}
          </div>
        </div>
        <form
          key={`form-${defaultEmotion ?? "new"}`}
          onSubmit={onSubmitDiary}
          className="mt-6 space-y-2"
        >
          <textarea
            name="answer"
            defaultValue={defaultAnswer}
            placeholder="답변을 작성해주세요."
            className="m-0 h-[380px] w-full resize-none outline-none"
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
          <div className="bg-primary-100 h-px" />
          <div className="text-right">
            <button
              type="submit"
              className="bg-primary-100 text-secondary-100 m-1 w-13 rounded-[10px]"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-primary-100 text-secondary-100 m-1 w-13 rounded-[10px]"
            >
              삭제
            </button>
          </div>
        </form>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={onDeleteDiary}
        />
        <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </section>

      <section>
        <div className="relative mt-27">
          <div className="absolute bottom-[0-calc(var(--spacing-navbar))] left-0 size-[140px] -translate-y-1/2">
            <Image
              src={surprisedDalbam}
              alt="running dalbam"
              fill
              className="bg-secondary-100 absolute object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
