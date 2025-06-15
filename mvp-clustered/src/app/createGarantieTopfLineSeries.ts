import {IChartApi, LineSeries, UTCTimestamp} from "lightweight-charts";
import {DataPoint} from "@/app/page";

function timeConverter(time: string) {
    const date = new Date(time);
    const utcTimestamp = Math.floor(date.getTime() / 1000) as UTCTimestamp;
    return utcTimestamp;
}

function calcValueDeviationFromStart(dataPoint: DataPoint, item: DataPoint) {
    const startValue = dataPoint.BALANCE;

    const profitSinceStart = (item.BALANCE/startValue)*100;

    return profitSinceStart;
}

export default function createGarantieTopfLineSeries(chart: IChartApi ,data: DataPoint[])
{

    const garantieTopfLineSeries = chart.addSeries(LineSeries);
    garantieTopfLineSeries.applyOptions({
        color: 'red',
        priceScaleId: 'left',
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: {
            type: 'percent', // Display values as prices
            precision: 1, // Number of decimal places
        },

    });



    garantieTopfLineSeries.setData(
        data.map((item: DataPoint) => ({
            time: timeConverter(item.DATE), // Assuming 'time' is in ISO format
            value: calcValueDeviationFromStart(data[0], item),
        }))
    );
}