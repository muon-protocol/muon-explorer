import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'styled-components';

const PieChart = ({ data }) => {

    const theme = useTheme()

    const handleData = () => {
        let total = 0

        data.forEach(i => {
            total += i
        })

        const dataArray = data.reduce((a, v) => ([...a, {
            name: `${Math.floor((v / total) * 100)}%`,
            value: v,
            label: {
                color: Math.floor((v / total) * 100) > 50 ? theme.palette.primary1 : theme.palette.gray5
            },
            itemStyle: {
                color: Math.floor((v / total) * 100) > 50 ? 'rgba(114, 2, 241, .6)' : 'rgba(114, 2, 241, .3)'
            }
        }]), [])

        return dataArray
    }

    const options = useMemo(() => ({
        series: [
            {
                type: 'pie',
                cursor: 'auto',
                radius: '75%',
                data: handleData(),
                silent: true,
                label: {
                    fontWeight: 'bold',
                    fontFamily: 'Lato',
                    fontSize: 18,
                    padding: [10, 10, 10, 10]
                },
                itemStyle: {
                    shadowColor: theme.palette.primary2,
                    shadowBlur: 20
                },
                labelLine: {
                    show: true,
                    length: 30,
                    length2: 30,
                    smooth: false,
                    lineStyle: {
                        color: theme.palette.primary1,
                        width: 4
                    }
                }
            }
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [data])

    return (
        <div>
            <ReactECharts option={options} />
        </div>
    )
}

export default PieChart