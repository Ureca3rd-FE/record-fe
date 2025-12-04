"use client";

import { cn } from "@/utils/cn";

type ButtonVariant = "default" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-primary-200 text-white",
  ghost: "bg-transparent text-primary-200",
};

export default function Button({
  type = "button",
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "w-full font-semibold px-5 py-3 rounded-[20px] transition active:scale-[0.98] disabled:opacity-60",
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
