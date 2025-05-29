//only client
"use client";

import Image from "next/image";

import {CandlestickSeries, createChart, LineSeries} from 'lightweight-charts'
import {useEffect, useRef} from "react";

function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, { width: 400, height: 300 });
      const lineSeries = chart.addSeries(CandlestickSeries);
      lineSeries.setData([

        // { time: '2019-01-02', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
        // { time: '2019-01-03', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        // { time: '2019-01-04', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
        // { time: '2019-01-05', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
          //generate array creat funktion to creates lines for the next 20000 days until 2019-01-25 with random ohlc values different to each other with variance of 1 but open needs to start where last closes ended
        ...Array.from({ length: 20000 }, (_, i) => {
            const time = new Date(2019, 0, 2 + i).toISOString().split('T')[0]; // Increment day by day
            const open = Math.random() * 100 + 100; // Random open price between 100 and 200
            const high = open + Math.random() * 10; // High is always greater than open
            const low = open - Math.random() * 10; // Low is always less than open
            const close = Math.random() * (high - low) + low; // Close is between low and high

            return { time, open, high, low, close };
        })




      ]);

      return () => {
        chart.remove(); // Clean up the chart on component unmount
      };
    }
  }, []);

  return <div ref={chartContainerRef} />;
}

export default function Home() {
  return (
      <ChartComponent />
  );
}
