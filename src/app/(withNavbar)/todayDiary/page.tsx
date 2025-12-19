import Image from "next/image";

import Logo from "@/assets/logo.svg";
import EmotionShareDay from "@/components/todayDiary/EmotionShareDay";
import SubmitDiary from "@/components/todayDiary/SubmitDiary";
import { getTodayQuestion } from "@/services/question";

import { format } from "date-fns";

const curiousDalbam = "/dalbam/curious.webp";

const today = format(new Date(), "yyyy-MM-dd");

export default async function TodayDiary() {
  const { result } = await getTodayQuestion(today);

  return (
    <main className="px-4 pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header className="text-primary-200">
        <Logo />
      </header>
      <div className="font-kotra-hope text-primary-200 mt-6">
        <EmotionShareDay today={today} />
        <div className="mt-6 flex flex-col items-center justify-center">
          <p>오늘의 달밤 일기</p>
          <Image src={curiousDalbam} alt="curious dalbam" width={120} height={120} />
        </div>
        <p className="mt-5 text-center">{result.question}</p>
      </div>
      <SubmitDiary date={today} questionId={result.id} />
    </main>
  );
}
