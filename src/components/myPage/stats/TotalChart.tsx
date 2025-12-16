"use client";

import { useEffect, useMemo, useRef } from "react";

import { ArcElement, Chart, PieController } from "chart.js";

Chart.register([PieController, ArcElement]);

const data = {
  positiveCount: 2,
  negativeCount: 1,
};

const positiveColor = "rgb(54, 162, 235)";
const negativeColor = "rgb(255, 125, 82)";

export default function TotalChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const chartData = useMemo(
    () => ({
      labels: ["긍정", "부정"],
      datasets: [
        {
          data: [data.positiveCount, data.negativeCount],
          backgroundColor: [positiveColor, negativeColor],
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "pie",
      data: chartData,
    });

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div className="space-y-2">
      <canvas ref={chartRef} />
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full" style={{ backgroundColor: positiveColor }} />
          <p>긍정</p>
          <p>{data.positiveCount}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full" style={{ backgroundColor: negativeColor }} />
          <p>부정</p>
          <p>{data.negativeCount}</p>
        </div>
      </div>
    </div>
  );
}
