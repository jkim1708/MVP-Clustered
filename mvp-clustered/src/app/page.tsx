"use client";
import {
    createChart,
    UTCTimestamp
} from 'lightweight-charts'
import {useEffect, useRef, useState} from "react";
import Papa from 'papaparse';
import createGarantieTopfLineSeries from "@/app/createGarantieTopfLineSeries";
import createVermoegensTopfLineSeries from './createVermoegensTopfLineSeries';
import createRestackLineSeries from './createRestackLineSeries';

//construct class

export type DataPoint = {
    DATE: string,
    EQUITY: number,
    BALANCE: number,
}

function ChartComponent() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<DataPoint[]>([]); // Define state for parsed CSV data

    useEffect(() => {
        const csvFilePath = '/data.csv';

        // CSV-Datei einlesen und parsen
        fetch(csvFilePath)
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true, // Falls die CSV eine Kopfzeile hat
                    skipEmptyLines: true,
                    complete: (result) => {
                        console.log('CSV parsing result:', result);
                        setData(result.data as DataPoint[]); // Geparste Daten speichern

                    },
                });
            });


    }, []);

    useEffect(() => {
        console.log('Data updated:', data);

        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: 400,
                height: 300,
                leftPriceScale: {visible: true, mode: 1},
                rightPriceScale: {visible: true, mode: 1,},
                timeScale: {
                    tickMarkFormatter: (time: UTCTimestamp) => {
                        const date = new Date(time); // Convert UNIX timestamp to JavaScript Date
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        return `${year}-${month}-${day}`;
                    },
                },

            });

            createGarantieTopfLineSeries(chart, data);
            createVermoegensTopfLineSeries(chart, data);
            createRestackLineSeries(chart);

            return () => {
                chart.remove(); // Clean up the chart on component unmount
            };
        }
    }, [data]);

    return <div ref={chartContainerRef}/>;
}

export default function Home() {
    return (

    <div className="chart-wrapper" >
    <div className="chart-container" >
        < ChartComponent  />
    </div>
    </div>
)
    ;
}
