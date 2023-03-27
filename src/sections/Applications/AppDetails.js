import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

const AppDetailsCol = ({ title, data, underline, start, end }) => {
    return (
        <div className='col-6 col-sm-4 col-lg-2'>
            <div className={`d-flex flex-column text-center ${start ? 'text-lg-start' : ''} ${end ? 'text-lg-end' : ''}`}>
                <h6 className='text-gray6 mb-4 small'>{title}</h6>
                <h6 className={`fw-bold text-gray1 mb-0 ${underline ? 'text-decoration-underline' : ''}`}>{data}</h6>
            </div>
        </div>
    )
}

export default function AppDetails() {

    const { info } = useSelector(store => store.data)

    const [time, setTime] = useState('')

    useEffect(() => {
        setTime(info.startTime ? new Date(info.startTime).toLocaleString() : '')
    }, [info])

    return (
        <div className='card shadow border-0 rounded-4 p-3'>
            <div className='card-body'>
                <div className='row g-4 align-items-center'>
                    <AppDetailsCol
                        title='App Name'
                        data={info?.name}
                        start
                    />
                    <AppDetailsCol
                        title='Most Used Method'
                        data={info?.mostUsedMethod}
                        underline
                    />
                    <AppDetailsCol
                        title='#Methods'
                        data={info?.methods.length}
                    />
                    <AppDetailsCol
                        title='#Nodes on app'
                        data={info?.nodes}
                    />
                    <AppDetailsCol
                        title='#Confirmed Requests'
                        data={info?.confirmedRequests}
                    />
                    <AppDetailsCol
                        title='Start Time'
                        data={time}
                        end
                    />
                </div>
            </div>
        </div>
    )
}
