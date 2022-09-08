import React, { FC } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { compactNumber } from "../lib/Utils";

type Props = {
    data?: any[];
    height?: string | number;
    legend?: boolean;
    dataKeys: { key: string; color?: string}[];
    tickFormatter?: (value: any) => string;
    tickCount?: number;
};

export const LineCharts: FC<Props> = ({
    data,
    height,
    legend,
    dataKeys,
    tickCount,
    tickFormatter
}: Props) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={height}
        >
            <LineChart
                width={500}
                height={200}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                    dataKey={dataKeys[0].key}
                    type="number"
                    axisLine={false}
                    tickCount={tickCount}
                    domain={["dataMin", "dataMa"]}
                    tickFormatter={tickFormatter}
                />
                <Tooltip content={<CustomTooltip tickFormatter={tickFormatter} />} />
                {legend && <Legend />}
                {dataKeys.map(({ key, color }) => (
                    <Line
                        key={key}
                        connectNulls
                        type="monotone"
                        dataKey={key}
                        stroke={color}
                        fill={color}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

LineCharts.defaultProps = {
    height: 300,
    tickCount: 10,
    legend: true,
    tickFormatter: (number) => {
        return compactNumber(Number(number));
    },
};

type IProps = {
    active: boolean;
    payload: { value: any; dataKey: string }[];
    label: string;
    tickFormatter?: (value: any) => string;
};

export const CustomTooltip = ({
    active,
    payload,
    label,
    tickFormatter,
}: Partial<IProps>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border rounded-lg p-4 transition-all shadow-sm">
                <p>{label}</p>
                <p className="text-indigo-500">
                    {payload[0].dataKey} : {tickFormatter?.(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

CustomTooltip.defaultProps = {
    tickFormatter: (value: any) => {
        return compactNumber(Number(value));
    },
};
