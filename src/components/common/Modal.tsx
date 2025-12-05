"use client";

import CancelIcon from "@/assets/cancleIcon.svg";

import Button from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  children?: React.ReactNode;
  showButton?: boolean; //버튼 없는 애들
  onConfirm?: () => void;
}


export default function Modal({
  open,
  onClose,
  title = "알림",
  description,
  buttonText = "확인",
  onConfirm,
  showButton = true,
  children,
}: ModalProps) {

  if (!open) return null;

  //확인 버튼 클릭 시 실행될 함수!
  const handleClick = () => {
    if(onConfirm) onConfirm();
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 배경 클릭하면 모달 닫힘  */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>


      {/* 박스x */}
      <div className="relative z-10 bg-secondary-100 w-[90%] rounded-2xl p-8 shadow-lg text-center">
        {/* 중요! 버튼이 있을 시 = true 일때만 닫기 아이콘을 표시 */}
        {/* 닫기 */}
        {showButton && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-200 text-2xl"
        >
        <CancelIcon className="w-6 h-6 text-primary-200" />
        </button>
        )}


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

        {/* 버튼이 보일때 =true일때만 버튼 표시 */}
        {showButton && (
        <Button onClick={onClose}>{buttonText}</Button>
        )}
      </div>
    </div>
  );
}
