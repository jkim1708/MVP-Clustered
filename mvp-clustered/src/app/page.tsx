"use client";
import {
    createChart, UTCTimestamp,
} from 'lightweight-charts'
import {useEffect, useRef, useState} from "react";
import createGarantieTopfLineSeries from "@/app/createGarantieTopfLineSeries";
import createVermoegensTopfLineSeries from './createVermoegensTopfLineSeries';
import createRestackLineSeries from './createRestackLineSeries';
import {Button} from "@/components/ui/button";
import {BarChart3} from "lucide-react";
import Papa from "papaparse";
import DateRangePicker from "@/date-range-picker";
import {useDataContext} from "@/context/DataContext";

//construct class

export type DataPoint = {
    DATE: string,
    EQUITY: number,
    BALANCE: number,
}

function timeConverter(time: string) {
    const date = new Date(time);
    const utcTimestamp = Math.floor(date.getTime() / 1000) as UTCTimestamp;
    return utcTimestamp;
}

function ChartComponent() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<DataPoint[] | undefined>();
    const {startDate, endDate} = useDataContext();

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
                width: 1000,
                height: 300,
                leftPriceScale: {visible: true, mode: 1},
                rightPriceScale: {visible: true, mode: 1,},
            });

            // Adjust time range

            console.log('has run');


            if (data) {

                createGarantieTopfLineSeries(chart, data);
                createVermoegensTopfLineSeries(chart, data);
                createRestackLineSeries(chart);

                if( startDate && endDate) {
                    const timeRange = {
                        from: timeConverter(startDate.toISOString() || ''), // Start date for the chart
                        to: timeConverter(endDate.toISOString() || ''), // End date for the chart
                        // from: timeConverter('2025-12-05T00:00:00Z'),
                        // to: timeConverter('2025-12-15T23:59:59Z'),
                    };
                    console.log('Time range:', timeRange);
                    console.log('chart timescale', chart.timeScale());
                    chart.timeScale().setVisibleRange(timeRange);
                } else {
                    // if (data[0]) {
                    //     const TimesScale = chart.timeScale();
                    //     console.log('Setting time scale:', TimesScale);
                    //     TimesScale.fitContent();
                    // }
                }

            }


            return () => {
                chart.remove(); // Clean up the chart on component unmount
            };
        }
    }, [data, startDate, endDate]);

    return <div ref={chartContainerRef}/>;
}

export default function Home() {

    return (
        <div>
            <div className="datepicker-popper">
            <DateRangePicker/>
            </div>
            <div className="chart-wrapper">


                <div className="chart-container">

                    <ChartComponent/>
                </div>


            </div>

            <div className="button-container">

                {/*<div>*/}
                {/*    <div className="datepicker-container">*/}
                {/*        <label htmlFor="start-date">Select Start Date:</label>*/}
                {/*        <DatePicker*/}
                {/*            id="start-date"*/}
                {/*            selected={startDate}*/}
                {/*            onChange={handleDateChange}*/}
                {/*            dateFormat="yyyy-MM-dd"*/}
                {/*            ref={datePickerRef}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    /!* Chart rendering logic *!/*/}
                {/*</div>*/}


                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                >
                    <BarChart3 className="h-4 w-4"/>
                    <a href={"/data.csv"}><span>Download CSV</span></a>
                </Button>
            </div>

        </div>


    )
        ;
}
