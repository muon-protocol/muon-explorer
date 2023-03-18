import React, { useEffect, useRef } from 'react'
import ReactECharts from 'echarts-for-react';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const DAY_HOURS = Array(24).fill('').map((_, ind) => ind + 1)

const Chart = ({ data, length }) => {

    const newIndex = useRef(0)

    useEffect(() => {
      newIndex.current = 0
    }, [length])

    const days = (e) => Array(e)
    .fill('')
    .map((_, index) => {
        if (index % 24 === 0) {
            const date = new Date(new Date().setDate(new Date().getDate() - newIndex.current))
            const day = date.getDate()
            const month = MONTH_NAMES[date.getMonth()].slice(0, 3)
            newIndex.current += 1
            return `${day + ' ' + month}`
        }
        else {
            return ''
        }
    })
    .reverse()

    const options = {
        grid: { top: 10, right: -10, bottom: 60, left: 50, height: '150px' },
        xAxis: {
            type: 'category',
            data: length === 1 ? DAY_HOURS : days(data.length),
            axisTick: {
                show: false,
            },
            show: true,
            axisLine: {
                show: false
            },
            axisLabel: {
                align: 'center',
                interval: length === 1 ? 1 : '',
                color: '#a9a9b9',
                fontFamily: 'Lato',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#a9a9b9',
                fontFamily: 'Lato',
            },
            splitLine: {
                show: false
            },
            scale: true,
        },
        series: [
            {
                data,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#5158f6',
                    width: 3
                },
                symbol: "none",
                areaStyle: {
                    color: 'rgb(81,88,246)',
                    opacity: .15
                }
            },
        ],
        // tooltip: {
        //     trigger: 'axis',
        // },
    };

    return (
        <div className='chart-cont'>
            <ReactECharts option={options} />
        </div>
    )
}

export default Chart