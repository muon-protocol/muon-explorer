import React, { useEffect, useMemo, useRef } from 'react'
import ReactECharts from 'echarts-for-react';
import { MONTH_NAMES, DAY_HOURS } from 'src/constants/applications';
import styled, { useTheme } from 'styled-components';

const StyledDiv = styled.div`
    height: 12rem;
`

export default function LineChart({ data, length }) {

    const theme = useTheme()

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

    const options = useMemo(() => ({
        grid: { top: 10, right: -10, bottom: 60, left: 30, height: '150px' },
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
                color: theme.palette.gray6,
                fontFamily: 'Lato',
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: theme.palette.gray6
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
                silent: true,
                lineStyle: {
                    color: theme.palette.primary1,
                    width: 3
                },
                symbol: "none",
                areaStyle: {
                    color: theme.palette.primary4,
                    opacity: .15
                }
            },
        ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [data, length])

    return (
        <StyledDiv>
            <ReactECharts option={options} />
        </StyledDiv>
    )
}