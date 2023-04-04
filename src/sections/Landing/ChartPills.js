import React, { useEffect } from 'react'

import Pills from 'src/components/Pills'

import { useDispatch } from 'react-redux'
import { getChartData } from 'src/redux/DataSlice'

export default function ChartPills({ color, active, setActive }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChartData({ period: active }))
    }, [dispatch, active])

    return (
        <Pills
            items={items}
            active={active}
            setActive={e => setActive(Number(e))}
            color={color}
        />
    )
}

const items = [
    { name: '1d', value: 1 },
    { name: '7d', value: 7 },
    { name: '14d', value: 14 },
    { name: '21d', value: 21 },
]