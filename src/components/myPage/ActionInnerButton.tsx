"use client";

interface BigButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
}

export default function BigButton({ icon, label, onClick }: BigButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-primary-200 flex flex-col items-center justify-center rounded-2xl bg-white py-6 shadow backdrop-blur-sm"
    >
      {icon}
      <p className="text-sm font-semibold">{label}</p>
    </button>
  );
}
