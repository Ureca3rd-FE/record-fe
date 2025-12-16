"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { useGetMonthlyEmotionStatus } from "@/lib/tanstack/query/emotion-status";
import { cn } from "@/utils/cn";

import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { format } from "date-fns";

interface DailyChartProps {
  selectedMonth: Date;
}

Chart.register(
  LineElement,
  LinearScale,
  LineController,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend
);

const positiveDalbam = "/dalbam/thumbsUp.webp";
const negativeDalbam = "/dalbam/crying.webp";

const positiveColor = "rgb(54, 162, 235)";
const positiveBackgroundColor = "rgba(54, 162, 235, 0.3)";
const negativeColor = "rgb(255, 125, 82)";
const negativeBackgroundColor = "rgba(255, 125, 82, 0.3)";

export default function DailyChart({ selectedMonth }: DailyChartProps) {
  const formattedMonth = format(selectedMonth, "yyyy-MM");

  const { data: monthlyEmotionStatus } = useGetMonthlyEmotionStatus(formattedMonth);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !monthlyEmotionStatus) return;

    const labels = monthlyEmotionStatus.diaries.map((diary) => `${diary.date}일`);
    const positiveData = monthlyEmotionStatus.diaries.map((diary) => diary.positiveCount);
    const negativeData = monthlyEmotionStatus.diaries.map((diary) => diary.negativeCount);

    // 기존 차트 제거
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "긍정",
            data: positiveData,
            borderColor: positiveColor,
            backgroundColor: positiveBackgroundColor,
            yAxisID: "posY",
            tension: 0.3,
            pointRadius: 4,
          },
          {
            label: "부정",
            data: negativeData,
            borderColor: negativeColor,
            backgroundColor: negativeBackgroundColor,
            yAxisID: "negY",
            tension: 0.3,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          posY: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "긍정 감정",
            },
            beginAtZero: true,
          },
          negY: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "부정 감정",
            },
            beginAtZero: true,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [monthlyEmotionStatus]);

  const totalDiaryCount = monthlyEmotionStatus.positiveCount + monthlyEmotionStatus.negativeCount;
  const isPositiveMonth = monthlyEmotionStatus.positiveCount >= monthlyEmotionStatus.negativeCount;

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="min-w-[500px] overflow-x-auto">
          <canvas ref={chartRef} />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <p>총 일기 수</p>
          <p className="text-primary-100">{totalDiaryCount}일</p>
        </div>
        <div className="flex items-center justify-between">
          <p>긍정적인 날</p>
          <p className="text-primary-100">{monthlyEmotionStatus.positiveCount}일</p>
        </div>
        <div className="flex items-center justify-between">
          <p>부정적인 날</p>
          <p className="text-primary-100">{monthlyEmotionStatus.negativeCount}일</p>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center justify-center gap-4",
          !isPositiveMonth && "flex-row-reverse"
        )}
      >
        <p className="text-center">
          이번 달은
          <br />
          <span className="text-xl font-semibold">
            {isPositiveMonth ? "긍정적인 날" : "부정적인 날"}
          </span>
          이 많아요.
        </p>
        <Image
          src={isPositiveMonth ? positiveDalbam : negativeDalbam}
          alt="emotion dalbam"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
