"use client";

import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  type = "button",
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary-200 text-white",
    secondary:
      "bg-secondary-100 text-primary-200",
  };

  return (
    <button
      type={type}
      className={cn(
        "w-full font-semibold px-5 py-3 rounded-[20px] transition active:scale-[0.98] disabled:opacity-60",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
