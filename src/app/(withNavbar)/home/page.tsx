import Image from "next/image";

import Logo from "@/assets/logo.svg";
import SubmitDiary from "@/components/home/SubmitDiary";

const curiousDalbam = "/dalbam/curious.webp";

export default function Home() {
  return (
    <main className="px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header>
        <Logo />
      </header>
      <div className="font-kotra-hope text-primary-200 mt-6">
        {/* 
          로그인이 안된 상태라면 0일, 된 상태라면 공유한 일수 표시 
          서비스 가입일 기준 공유일지, 일기 쓴 개수로 공유일지
        */}
        <p className="text-end">
          감정을 공유한지 <span className="text-xl">10</span>일째
        </p>
        <div className="mt-6 flex flex-col items-center justify-center">
          <p>오늘의 달밤 일기</p>
          <Image src={curiousDalbam} alt="curious dalbam" width={120} height={120} />
        </div>
        {/* TODO: 오늘의 일기 API 연동하여 표시하기 */}
        <p className="mt-5 text-center">오늘 하루 중 가장 기분 좋았던 순간은 언제였나요?</p>
      </div>
      <SubmitDiary />
    </main>
  );
}
