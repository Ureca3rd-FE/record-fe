"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.svg";
import Button from "@/components/common/Button";
import { cn } from "@/utils/cn";

import useEmblaCarousel from "embla-carousel-react";

const firstStep = "/dalbam/curious.webp";
const secondStep = "/dalbam/writing.webp";
const thirdStep = "/dalbam/surprised.webp";
const lastStep = "/dalbam/running.webp";

const slides = [
  {
    src: firstStep,
    text: "저는 달밤이에요!\n당신이 너무 궁금해요!\n매일 매일 질문하고 싶어요!",
  },
  { src: secondStep, text: "오늘의 하루는 어떠했나요?\nrecord가 다정하게 분석해줄게요" },
  { src: thirdStep, text: "질문에 답을 하다보면\n당신에 대해 알 수 있을거에요!" },
  { src: lastStep, text: "달밤이와 함께 하루를 기록해보아요!" },
];

export default function Onboarding() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const isLastStep = selectedIndex === slides.length - 1;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onNext = () => {
    if (!emblaApi) return;

    if (isLastStep) {
      router.push("/home");
    }

    emblaApi.scrollNext();
  };

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <main className="bg-primary-100 flex min-h-screen flex-col gap-5 px-4 py-6">
      <header>
        <Logo />
      </header>
      <section className="flex flex-1 flex-col justify-between gap-5">
        <div
          ref={emblaRef}
          className="bg-secondary-100 embla flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[20px]"
        >
          <div className="embla__container flex">
            {slides.map((props, idx) => (
              <div className="embla__slide flex flex-col items-center" key={`slide-${idx}`}>
                <Image src={props.src} alt={props.text} width={260} height={260} />
                <p className="text-primary-100 font-pretendard text-center font-semibold whitespace-pre-line">
                  {props.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-20 flex items-center gap-2">
            {Array.from({ length: slides.length }).map((_, idx) => (
              <div
                key={`dot-${idx}`}
                className={cn(
                  "bg-primary-100 size-3 rounded-full transition-colors",
                  selectedIndex === idx && "bg-primary-200"
                )}
              />
            ))}
          </div>
        </div>
        <Button variant="ghost" onClick={onNext}>
          {isLastStep ? "시작하기" : "다음"}
        </Button>
      </section>
    </main>
  );
}
