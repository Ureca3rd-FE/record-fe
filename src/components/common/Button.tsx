"use client";

import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const buttonVariants: Record<string, string> = {
  default: "bg-color-primary-200 text-white",
  ghost:
    "bg-transparent text-color-primary-200 border border-color-primary-200",
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
