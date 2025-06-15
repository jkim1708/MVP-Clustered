import {IChartApi, LineSeries, UTCTimestamp} from "lightweight-charts";
import {DataPoint} from "@/app/page";

function timeConverter(time: string) {
    const date = new Date(time);
    const utcTimestamp = Math.floor(date.getTime() / 1000) as UTCTimestamp;
    return utcTimestamp;
}

function calcValueDeviationFromStart(dataPoint: DataPoint, item: DataPoint) {
    const startValue = dataPoint.EQUITY;

    const profitSinceStart = (item.EQUITY/startValue)*100;

    return profitSinceStart;
}

export default function createVermögensTopfLineSeries(chart: IChartApi ,data: DataPoint[])
{

    const vermögensTopfLineSeries = chart.addSeries(LineSeries);
    vermögensTopfLineSeries.applyOptions({
        priceScaleId: 'left',
        lastValueVisible: false,
        priceLineVisible: false,
    });
    vermögensTopfLineSeries.setData(
        data.map((item: DataPoint) => ({
            time: timeConverter(item.DATE), // Assuming 'time' is in ISO format
            value: calcValueDeviationFromStart(data[0], item),
        }))
        );
}