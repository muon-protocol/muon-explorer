import React, { useEffect, useMemo, useRef } from 'react'
import ReactECharts from 'echarts-for-react';
import { MONTH_NAMES } from 'src/constants/applications';
import styled, { useTheme } from 'styled-components';

const StyledDiv = styled.div`
    height: 12rem;
`

export default function LineChart({ data, length, small }) {

    const theme = useTheme()

    const newIndex = useRef(0)

    useEffect(() => {
        newIndex.current = 0
    }, [length])

    const days = (e) => Array(e)
        .fill('')
        .map((_, index) => {
            if (small ? index % 72 === 0 : index % 24 === 0) {
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

    const hours = () => {
        const timeArray = []
        Array(24).fill('').forEach((_, index) => {
            const time = new Date(new Date().setHours(new Date().getHours() - index - 1)).getHours()
            timeArray.unshift(time)
        })
        return timeArray
    }

    const options = useMemo(() => ({
        grid: { top: 10, right: small ? 10 : -10, bottom: 60, left: 30, height: small ? '100px' : '150px' },
        xAxis: {
            type: 'category',
            data: length === 1 ? hours() : days(data.length),
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
                color: theme.palette.gray3,
                fontFamily: 'Lato',
                fontSize: 10
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: theme.palette.gray3
            },
            splitLine: {
                show: false
            },
            scale: true,
            min: 0
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
                    color: theme.palette.primary1,
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