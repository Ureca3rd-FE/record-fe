"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { redirect, RedirectType, useRouter } from "next/navigation";

import BackIcon from "@/assets/chevronLeft.svg";
import Button from "@/components/common/Button";
import type { RootState } from "@/store";

import DOMPurify from "dompurify";
import download from "downloadjs";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";

const runningDalbam = "/dalbam/running-line.webp";

export default function DiarySummary() {
  const [isDownloading, setIsDownloading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const diarySummary = useSelector((state: RootState) => state.diary.diarySummary);

  const onDownload = async () => {
    if (!summaryRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(summaryRef.current, {
        backgroundColor: "#eddbcd",
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const currentTime = new Date().getTime();
      download(dataUrl, `${currentTime}.png`);
    } catch (error) {
      console.error("이미지 다운로드 실패:", error);
      alert("이미지 다운로드에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (diarySummary === null) {
    return redirect("/todayDiary", RedirectType.replace);
  }

  const positiveKeywords =
    diarySummary.positive.length > 0 ? diarySummary.positive.join(", ") : "-";
  const negativeKeywords =
    diarySummary.negative.length > 0 ? diarySummary.negative.join(", ") : "-";

  const sanitizedSummary = DOMPurify.sanitize(diarySummary.summary);

  return (
    <main ref={summaryRef} className="font-kotra-hope pt-6 pb-[calc(var(--spacing-navbar)+24px)]">
      <header className="flex items-center justify-between px-4">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <p className="text-primary-200 text-2xl">달밤이의 요약</p>
        <div className="size-6" />
      </header>
      <div className="relative mt-10">
        <div className="absolute right-10 z-10 size-[60px] -translate-y-1/2">
          <Image
            src={runningDalbam}
            alt="running dalbam"
            fill
            className="bg-secondary-100 absolute object-cover"
          />
        </div>
        <hr className="border-primary-200" />
      </div>
      <section className="my-12 space-y-5 px-4">
        <div>
          <p className="text-primary-200 text-lg">긍정 키워드</p>
          <p className="text-primary-100 text-sm">{positiveKeywords}</p>
        </div>
        <div>
          <p className="text-primary-200 text-lg">부정 키워드</p>
          <p className="text-primary-100 text-sm">{negativeKeywords}</p>
        </div>
      </section>
      <section className="px-4">
        <div className="space-y-1">
          <p className="text-primary-200 text-lg">요약</p>
          <p
            className="bg-primary-100 font-gowun-dodum min-h-60 rounded-xl p-3 text-sm text-white"
            dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
          />
        </div>
        <Button className="mt-6 mb-3 rounded-xl py-4" onClick={onDownload} disabled={isDownloading}>
          {isDownloading ? "다운로드 중..." : "다운로드"}
        </Button>
        <p className="text-primary-200 text-end text-sm">오늘의 요약은 따로 저장 되지 않습니다.</p>
      </section>
    </main>
  );
}
