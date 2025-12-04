"use client";

import { cn } from "@/utils/cn";

export default function Button({
  type = "button",
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "w-full bg-[var(--color-primary-200)] text-white font-semibold px-5 py-3 rounded-[20px] transition active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
