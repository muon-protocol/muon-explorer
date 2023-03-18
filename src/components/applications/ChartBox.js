import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import Chart from '../UI/Chart'

import { useDispatch, useSelector } from 'react-redux'
import { getChartData } from 'src/redux/DataSlice'

export default function ChartBox() {

    const { chartData, chartLoading } = useSelector(store => store.data)

    const dispatch = useDispatch()

    const [length, setLength] = useState(21)

    useEffect(() => {
        dispatch(getChartData({ period: length }))
    }, [dispatch, length])

    return (
        <div className='card shadow border-0 rounded-4 bg-gradient2 p-3'>

            <div className='card-header border-0 bg-transparent d-flex flex-wrap justify-content-between align-items-center'>
                <h5 className='fw-bold mb-4 mb-sm-0'>Deus App Requests History</h5>

                <Nav
                    variant="pills"
                    className='bg-gray10 rounded-4 shadow'
                    activeKey={length}
                    onSelect={e => setLength(Number(e))}
                >
                    <Nav.Item>
                        <Nav.Link className='py-1 px-3 text-gray7 smaller rounded-4' eventKey={1}>1d</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='py-1 px-3 text-gray7 smaller rounded-4' eventKey={7}>7d</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='py-1 px-3 text-gray7 smaller rounded-4' eventKey={14}>14d</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='py-1 px-3 text-gray7 smaller rounded-4' eventKey={21}>21d</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <div className='card-body'>
                <Chart data={chartLoading ? [] : chartData} length={length} />
            </div>

        </div>
    )
}
