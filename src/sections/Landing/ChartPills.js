import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

import Pills from 'src/components/Pills'

import { useDispatch } from 'react-redux'
import { getRequestHistory } from 'src/redux/RequestsSlice'

const ChartPills = ({ active, setActive, app }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getRequestHistory({ range: active, app }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, active])

	return <Pills items={items} active={active} setActive={(e) => setActive(Number(e))} />
}

export default ChartPills

const items = [
	{ name: '1d', value: 1 },
	{ name: '7d', value: 7 },
	{ name: '14d', value: 14 },
	{ name: '21d', value: 21 },
]
