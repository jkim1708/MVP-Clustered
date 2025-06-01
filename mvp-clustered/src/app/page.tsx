"use client";
import {CandlestickSeries, createChart, LineSeries, createSeriesMarkers} from 'lightweight-charts'
import {useEffect, useRef} from "react";

function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, { width: 400, height: 300, leftPriceScale: {visible: true, mode: 1,    priceFormat: {
                  type: 'percent', // Display values as percentages
                  precision: 2, // Number of decimal places
              },} , rightPriceScale: {visible: true, mode: 1, } });
      const lineSeries = chart.addSeries(CandlestickSeries);
        lineSeries.applyOptions({
            priceScaleId: 'left',
            priceFormat: {
                type: 'percent', // Display values as prices
                precision: 1, // Number of decimal places
            }
        });

      let lastClose: number = 0; // Starting point for the first open price
      lineSeries.setData([

        // { time: '2019-01-02', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
        // { time: '2019-01-03', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        // { time: '2019-01-04', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
        // { time: '2019-01-05', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
          //generate array creat funktion to creates lines for the next 20000 days until 2019-01-25 with random ohlc values different to each other with variance of 1 but open needs to start where last closes ended

        ...Array.from({ length: 200 }, (_, i) => {
            const time = new Date(2019, 0, 2 + i).toISOString().split('T')[0]; // Increment day by day
            const open = lastClose != 0 ? lastClose :  Math.random() * 100 + 100; // Random open price between 100 and 200
            const high = open + Math.random() * 10; // High is always greater than open
            const low = open - Math.random() * 10; // Low is always less than open
            const close = Math.random() * (high - low) + low; // Close is between low and high
            lastClose = close;
            return { time, open, high, low, close };
        })

      ]);


        const customSeries = chart.addSeries(LineSeries);
        //configure customSeries to left price scale
        customSeries.applyOptions({
            priceScaleId: 'right',
            lineVisible: false,
            priceFormat: {
                type: 'percent', // Display values as prices
                precision: 1, // Number of decimal places
            }
            // priceLineVisible: true,
            // crossHairMarkerVisible: true,
        });
        customSeries.setData([
            { time: '2025-09-02', value:100},
            { time: '2025-09-03', value:105},
        ])

        const seriesMarkers = createSeriesMarkers(
            customSeries,
            [
                {
                    color: 'green',
                    position: 'inBar',
                    shape: 'arrowDown',
                    time: '2025-09-02',
                },
            ]
        );
        // and then you can modify the markers
        // set it to empty array to remove all markers
        seriesMarkers.setMarkers([ {position: 'inBar', time: '2025-09-02', color: 'red', shape: 'circle'} ]);




        let lastClose2: number = 0; // Starting point for the first open price

        const lineSeries2 = chart.addSeries(CandlestickSeries);
        lineSeries2.applyOptions({
            priceScaleId: 'left',
        });
        lineSeries2.setData([

            // { time: '2019-01-02', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
            // { time: '2019-01-03', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
            // { time: '2019-01-04', open: 145.72, high: 170.39, low: 120.25, close: 141.77 },
            // { time: '2019-01-05', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
            //generate array creat funktion to creates lines for the next 20000 days until 2019-01-25 with random ohlc values different to each other with variance of 1 but open needs to start where last closes ended
            ...Array.from({ length: 200 }, (_, i) => {
                const time = new Date(2019, 0, 2 + i).toISOString().split('T')[0]; // Increment day by day
                const open = lastClose2 != 0 ? lastClose2 :  Math.random() * 100 + 100; // Random open price between 100 and 200
                const high = open + Math.random() * 10; // High is always greater than open
                const low = open - Math.random() * 10; // Low is always less than open
                const close = Math.random() * (high - low) + low; // Close is between low and high
                lastClose2 = close;

                return { time, open, high, low, close };
            })]);


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
