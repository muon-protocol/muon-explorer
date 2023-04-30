import React, { useMemo } from 'react'
import dynamic from 'next/dynamic';
import { useTheme } from 'styled-components';
import { PieChart as CustomPieChart, Pie, Cell } from 'recharts';

const PieChart = ({ data, large }) => {

    const theme = useTheme()

    const handleData = useMemo(() => {
        let total = 0

        data.forEach(i => {
            total += i
        })

        const dataArray = data.reduce((a, v) => ([...a, {
            name: `${Math.floor((v / total) * 100)}%`,
            value: v,
            labelColor: Math.floor((v / total) * 100) > 50 ? theme.palette.primary1 : theme.palette.gray5,
            cellColor: Math.floor((v / total) * 100) > 50 ? 'rgba(81, 88, 246, 0.5)' : 'rgba(114, 81, 246, 0.25)'
        }]), [])

        return dataArray
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <CustomPieChart width={large ? 400 : 300} height={large ? 250 : 180}>
            <Pie
                cx="50%"
                cy="50%"
                outerRadius={large ? 100 : 60}
                data={handleData}
                fill="#82ca9d"
                stroke='none'
                dataKey='value'
                label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                        <text
                            x={x}
                            y={y}
                            fill={handleData[index].labelColor}
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            fontWeight='bold'
                        >
                            {handleData[index].name}
                        </text>
                    );
                }}
            >
                {handleData.map((item, index) => (
                    <Cell key={index} fill={item.cellColor} style={{ outline: 'none' }} />
                ))}
            </Pie>
        </CustomPieChart>
    )
}

export default dynamic(() => Promise.resolve(PieChart), { ssr: false });