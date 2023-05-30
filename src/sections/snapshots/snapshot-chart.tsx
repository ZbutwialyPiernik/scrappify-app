import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {PriceChart} from "../../features/products/product-service";

interface ProductPriceChartProps {
    chartData?: PriceChart
}

const SnapshotPriceChart = ({chartData}: ProductPriceChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <XAxis type="category" dataKey="day" name="day"/>
                <YAxis type="number" dataKey="price" name="price"/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Legend/>
                <Scatter name="Cena" data={chartData?.data} fill="#8884d8" line/>
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default SnapshotPriceChart;