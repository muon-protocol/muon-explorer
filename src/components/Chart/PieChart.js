import React, { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { PieChart as CustomPieChart, Pie, Cell } from 'recharts'

export default function PieChart({ data, large }) {
	const theme = useTheme()

	const handleData = useMemo(() => {
		let total = 0

		data.forEach((i) => {
			total += i
		})

		const dataArray = data.reduce(
			(a, v, i) => [
				...a,
				{
					name: `${Number(((v / total) * 100).toFixed(1))}%`,
					value: v,
					labelColor: i === 0 ? theme.palette.primaryL2 : theme.palette.gray8,
					cellColor: i === 0 ? '#918EF5' : 'rgba(145, 142, 245, 0.5)',
				},
			],
			[]
		)

		return dataArray
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	return (
		<CustomPieChart width={large ? 400 : 300} height={large ? 250 : 180}>
			<Pie
				cx='50%'
				cy='50%'
				outerRadius={large ? 100 : 60}
				data={handleData}
				fill='#82ca9d'
				stroke='none'
				dataKey='value'
				label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
					const RADIAN = Math.PI / 180
					const radius = 25 + innerRadius + (outerRadius - innerRadius)
					const x = cx + radius * Math.cos(-midAngle * RADIAN)
					const y = cy + radius * Math.sin(-midAngle * RADIAN)
					return (
						<text
							x={x}
							y={y}
							fill={handleData[index].labelColor}
							textAnchor={x > cx ? 'start' : 'end'}
							dominantBaseline='central'
							fontWeight='bold'
						>
							{handleData[index].name}
						</text>
					)
				}}
			>
				{handleData.map((item, index) => (
					<Cell key={index} fill={item.cellColor} style={{ outline: 'none' }} />
				))}
			</Pie>
		</CustomPieChart>
	)
}
