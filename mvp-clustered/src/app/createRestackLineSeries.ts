import {createSeriesMarkers, IChartApi, LineSeries} from "lightweight-charts";

export default function createRestackLineSeries(chart: IChartApi)
{


    const restackLineSeries = chart.addSeries(LineSeries);
    //configure customSeries to left price scale
    restackLineSeries.applyOptions({
        priceScaleId: 'right',
        lineVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
            type: 'percent', // Display values as prices
            precision: 1, // Number of decimal places
        }
        // priceLineVisible: true,
        // crossHairMarkerVisible: true,
    });


    restackLineSeries.setData([
        {time: '2025-09-02', value: 100},
        {time: '2025-09-03', value: 105},
    ])

    const seriesMarkers = createSeriesMarkers(
        restackLineSeries,
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
    seriesMarkers.setMarkers([{position: 'inBar', time: '2025-09-02', color: 'red', shape: 'circle'}]);
}