import React, { useEffect, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic';
import ReactECharts from 'echarts-for-react';
import { MONTH_NAMES } from 'src/constants/applications';
import styled, { useTheme } from 'styled-components';

const StyledDiv = styled.div`
    height: 12rem;
`

const LineChart = ({ data, length, small }) => {

    const theme = useTheme()

    const newIndex = useRef(0)

    useEffect(() => {
        newIndex.current = 0
    }, [length])

    const handleLabels = () => {
        if (length === 1) {
            const timeArray = []
            Array(24).fill('').forEach((_, index) => {
                const time = new Date(new Date().setHours(new Date().getHours() - index - 1)).getHours()
                timeArray.unshift(time)
            })
            return timeArray
        }
        else {
            return Array(length)
                .fill('')
                .map((_, index) => {
                    if (small ? index % 3 === 0 : true) {
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
        }
    }

    const handleData = () => {
        if (length === 1) {
            return data
        }
        else {
            let array = []
            for (let i = 0; i < length; i++) {
                const sum = data.slice(i * 24, (i * 24) + 24).reduce((a, b) => a + b, 0)
                array.push(sum)
            }
            return array
        }
    }

    const options = useMemo(() => ({
        grid: { top: 10, right: small ? 10 : -10, bottom: 60, left: 45, height: small ? '100px' : '150px' },
        xAxis: {
            type: 'category',
            data: handleLabels(),
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
                data: handleData(),
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

export default dynamic(() => Promise.resolve(LineChart), { ssr: false });