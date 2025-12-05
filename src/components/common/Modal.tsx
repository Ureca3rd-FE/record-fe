"use client";

import CancelIcon from "@/assets/cancleIcon.svg";
import type { ModalProps } from "@/types/modal";

import Button from "./Button";


export default function Modal({
  open,
  onClose,
  title = "알림",
  description,
  buttonText = "확인",
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 박스x */}
      <div className="relative z-10 bg-secondary-100 w-[90%] rounded-2xl p-8 shadow-lg text-center">

        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-200 text-2xl"
        >
        <CancelIcon className="w-6 h-6 text-primary-200" />
        </button>

        {/* 제목 */}
        <h2 className="text-primary-200 font-bold text-2xl mb-4">
          {title}
        </h2>

        {children}

        {/* 내용 */}
        {description && (
          <p className="text-primary-200 font-semibold mb-8">
            {description}
          </p>
        )}

        {/* 버튼 */}
        <Button onClick={onClose}>{buttonText}</Button>
      </div>
    </div>
  );
}
