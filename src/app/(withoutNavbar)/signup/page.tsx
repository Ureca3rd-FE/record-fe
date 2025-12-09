"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { useCheckNickname, useUpdateUserNickname } from "@/lib/tanstack/mutation/user";
import { cn } from "@/utils/cn";

export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkedNickname, setCheckedNickname] = useState<string | null>(null);

  const router = useRouter();

  const { mutate: checkNickname, isPending } = useCheckNickname({
    onSuccess: (data) => {
      setIsChecked(data.result.isDuplicated);
      setCheckedNickname(nickname);
    },
    onError: (error) => {
      alert("중복 확인 요청에 실패했어요.");
      console.error(error);
    },
  });

  const { mutate: updateUserNickname, isPending: isUpdateUserNicknamePending } =
    useUpdateUserNickname({
      onSuccess: () => {
        router.replace("/home");
      },
      onError: (error) => {
        alert("닉네임 등록 중 오류가 발생했어요.");
        console.error(error);
      },
    });

  const onNicknameChange = (value: string) => {
    setNickname(value);
    if (checkedNickname !== null && value !== checkedNickname) {
      setIsChecked(false);
      setCheckedNickname(null);
    }
  };

  const isDuplicateCheckDisabled =
    nickname.length < 2 ||
    (checkedNickname !== null && nickname !== checkedNickname) ||
    (!isChecked && checkedNickname !== null) ||
    isPending;

  const isSubmitDisabled =
    checkedNickname === null ||
    checkedNickname !== nickname ||
    isChecked ||
    isUpdateUserNicknamePending;

  return (
    <main className="flex min-h-screen flex-col gap-5 px-4 py-6">
      <section className="flex-1">
        <div className="mb-5">
          <h1 className="text-primary-200 text-2xl font-bold">닉네임 입력</h1>
          <p className="text-primary-100 text-lg">사용하실 닉네임을 입력해주세요.</p>
        </div>
        <div className="flex items-stretch gap-2 text-sm">
          <input
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            className="border-primary-200 placeholder:text-text-100 text-text-200 w-full flex-1 rounded-lg border-2 p-3 font-medium outline-none"
            aria-label="닉네임 입력"
            maxLength={10}
          />
          <Button
            onClick={() => checkNickname(nickname)}
            disabled={isDuplicateCheckDisabled}
            className="w-max rounded-lg text-nowrap"
          >
            중복 확인
          </Button>
        </div>
        {checkedNickname !== null && checkedNickname === nickname && (
          <p
            className={cn("text-sm font-medium", isChecked ? "text-red-600" : "text-green-600")}
            role="status"
            aria-live="polite"
          >
            {isChecked ? "중복된 닉네임이에요." : "사용 가능한 닉네임이에요."}
          </p>
        )}
      </section>
      <Button
        onClick={() => updateUserNickname(nickname)}
        className="rounded-2xl"
        disabled={isSubmitDisabled}
      >
        {isUpdateUserNicknamePending ? <Loader /> : "완료"}
      </Button>
    </main>
  );
}
