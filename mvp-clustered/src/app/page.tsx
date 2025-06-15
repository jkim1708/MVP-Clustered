"use client";
import {
    createChart,
} from 'lightweight-charts'
import {useEffect, useRef} from "react";
import createGarantieTopfLineSeries from "@/app/createGarantieTopfLineSeries";
import createVermoegensTopfLineSeries from './createVermoegensTopfLineSeries';
import createRestackLineSeries from './createRestackLineSeries';
import {useDataContext} from "@/context/DataContext";
import {Button} from "@/components/ui/button";
import {BarChart3} from "lucide-react";
import {useRouter} from "next/navigation";

//construct class

export type DataPoint = {
    DATE: string,
    EQUITY: number,
    BALANCE: number,
}

function ChartComponent() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const {data} = useDataContext();
    const router = useRouter();

    useEffect(() => {
        if (data.length === 0) {
            console.log('No data available to display chart.');
            router.push('/csv-upload'); // Redirect to CSV upload page if no data
            return;
        }
    }, []);

    useEffect(() => {
        console.log('Data updated:', data);

        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: 400,
                height: 300,
                leftPriceScale: {visible: true, mode: 1},
                rightPriceScale: {visible: true, mode: 1,},

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

    const router = useRouter();

    const handleCreateNewChart = () => {
        router.push('/csv-upload'); // Navigate to chart creation or show chart options
    }

    return (
        <div>
            <div className="chart-wrapper">
                <div className="chart-container">
                    < ChartComponent/>
                </div>

            </div>
            <div className="button-container">

            <Button
                variant="outline"
                size="sm"
                onClick={handleCreateNewChart}
                className="flex items-center space-x-2"
            >
                <BarChart3 className="h-4 w-4" />
                <span>Create New Chart</span>
            </Button>
            </div>

        </div>


    )
        ;
}
