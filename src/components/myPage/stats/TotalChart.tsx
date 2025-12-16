"use client";

import { useEffect, useMemo, useRef } from "react";

import { useGetEmotionStatus } from "@/lib/tanstack/query/emotion-status";

import { ArcElement, Chart, PieController } from "chart.js";
import { format } from "date-fns";

interface TotalChartProps {
  selectedMonth: Date;
}

Chart.register([PieController, ArcElement]);

const positiveColor = "rgb(54, 162, 235)";
const negativeColor = "rgb(255, 125, 82)";

export default function TotalChart({ selectedMonth }: TotalChartProps) {
  const formattedMonth = format(selectedMonth, "yyyy-MM");

  const { data: emotionStatus } = useGetEmotionStatus(formattedMonth);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const chartData = useMemo(() => {
    if (!emotionStatus) return null;

    return {
      labels: [`긍정 ${emotionStatus.positiveCount}`, `부정 ${emotionStatus.negativeCount}`],
      datasets: [
        {
          data: [emotionStatus.positiveCount, emotionStatus.negativeCount],
          backgroundColor: [positiveColor, negativeColor],
        },
      ],
    };
  }, [emotionStatus]);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "pie",
      data: chartData,
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [chartData]);

  if (!emotionStatus) {
    return <p className="text-primary-100">해당 달에는 일기를 작성하지 않았어요.</p>;
  }

  return <canvas ref={chartRef} />;
}
