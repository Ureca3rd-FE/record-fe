"use client";

import Button from "@/components/common/button/Button";

export default function TestPage() {
  const handleClick = () => {
    alert("버튼 클릭");
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center px-6">
      <Button onClick={handleClick}>확인</Button>
    </div>
  );
}
