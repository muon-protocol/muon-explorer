import React, { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { MONTH_NAMES } from 'src/constants/applications'
import { useTheme } from 'styled-components'

export default function LineChart({ data, length, small }) {
	const theme = useTheme()

	const formatData = useMemo(() => {
		if (length === 1) {
			const formated = []
			Array(24)
				.fill('')
				.forEach((_, index) => {
					const time = new Date(
						new Date().setHours(new Date().getHours() - 24 + index + 1)
					).getHours()
					formated.push({
						name: index % 2 === 0 ? '' : time,
						value: data[index],
					})
				})
			return formated
		} else {
			const formated = []
			Array(length)
				.fill('')
				.forEach((_, index) => {
					const date = new Date(new Date().setDate(new Date().getDate() - length + index + 1))
					const day = date.getDate()
					const month = MONTH_NAMES[date.getMonth()].slice(0, 3)
					formated.push({
						name: (small ? index % 3 === 0 : true) ? `${day + ' ' + month}` : '',
						value: data[index],
					})
				})
			return formated
		}
	}, [data, length, small])

	return (
		<ResponsiveContainer width='100%' height={small ? 150 : 200}>
			<AreaChart
				height='100%'
				width='100%'
				data={formatData}
				margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
			>
				<XAxis
					dataKey='name'
					fontSize={10}
					fontWeight={700}
					tickLine={false}
					stroke={theme.palette.label}
					axisLine={false}
					padding={{ left: 10 }}
					interval={0}
				/>
				<YAxis
					fontSize={12}
					fontWeight={700}
					tickLine={false}
					stroke={theme.palette.label}
					axisLine={false}
					interval={0}
					padding={{ bottom: 10 }}
				/>
				<Area
					type='monotone'
					dataKey='value'
					stroke={theme.palette.graphStroke}
					strokeWidth={3}
					fill={theme.palette.primaryL1}
					dot={false}
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}
