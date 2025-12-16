"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register([LineElement, LinearScale, LineController, CategoryScale, PointElement]);

const chartData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
  datasets: [
    {
      label: "Dataset",
      data: [1, 2, 3, 4, 5, 6],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 10,
    },
  ],
};

const positiveDalbam = "/dalbam/thumbsUp.webp";
const negativeDalbam = "/dalbam/crying.webp";

export default function DailyChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="space-y-4">
      <canvas ref={chartRef} />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p>총 일기 수</p>
          <p className="text-primary-100 text-sm">4개</p>
        </div>
        <div className="flex items-center justify-between">
          <p>긍정적인 날</p>
          <p className="text-primary-100 text-sm">3일</p>
        </div>
        <div className="flex items-center justify-between">
          <p>부정적인 날</p>
          <p className="text-primary-100 text-sm">1일</p>
        </div>
      </div>
      {/* 부정적인 경우 flex-row-reverse 적용하기 */}
      <div className="flex items-center justify-center gap-4">
        <p>
          이번 달은
          <br />
          <span className="text-xl">긍정적인 날</span>이 많아요.
        </p>
        <Image src={positiveDalbam} alt="positive dalbam" width={100} height={100} />
      </div>
    </div>
  );
}
