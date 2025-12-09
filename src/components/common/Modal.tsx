"use client";

import { createContext, useContext } from "react";

import CancelIcon from "@/assets/cancleIcon.svg";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/utils/cn";

import { createPortal } from "react-dom";

import Button from "./Button";

const ModalContext = createContext<{ isOpen: boolean; onClose: () => void } | null>(null);

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose, className: _className, ...props }: ModalProps) {
  const modalRef = useOutsideClick<HTMLDivElement>(() => onClose());

  const className = cn(
    _className,
    "bg-secondary-100 relative z-10 w-[90%] rounded-2xl p-8 text-center shadow-lg space-y-2.5"
  );

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {/* 배경 클릭하면 모달 닫힘  */}
      <div className="font-kotra-hope fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div ref={modalRef} className={className} {...props}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

function ModalCloseButton() {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Modal 컴포넌트 내부에서 사용되어야 합니다.");
  }

  const { onClose } = context;

  return (
    <button onClick={onClose} className="text-primary-200 absolute top-4 right-4 text-2xl">
      <CancelIcon className="text-primary-200 h-6 w-6" />
    </button>
  );
}

function ModalHeader({
  children,
  className: _className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Modal 컴포넌트 내부에서 사용되어야 합니다.");
  }

  const className = cn(_className, "text-primary-200  text-2xl ");

  return (
    <h2 className={className} {...props}>
      {children}
    </h2>
  );
}

function ModalContent({
  children,
  className: _className,
  ...props
}: React.ParamHTMLAttributes<HTMLParagraphElement>) {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Modal 컴포넌트 내부에서 사용되어야 합니다.");
  }

  const className = cn(_className, "text-primary-100   whitespace-pre-line");

  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
}

function ModalConfirmButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Modal 컴포넌트 내부에서 사용되어야 합니다.");
  }

  return <Button {...props}>{children}</Button>;
}

export { Modal, ModalCloseButton, ModalHeader, ModalContent, ModalConfirmButton };
