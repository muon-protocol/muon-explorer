import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import vector from 'public/images/vector.png'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledHeading = styled.h6`
    color: ${({ theme, color }) => theme.palette[color]};
`

const AppDetailsCol = ({ title, data, underline, start, end }) => {
    return (
        <div className='col-6 col-sm-4 col-lg-2'>
            <div className={`d-flex flex-column text-center ${start ? 'text-lg-start' : ''} ${end ? 'text-lg-end' : ''}`}>
                <StyledHeading className='mb-4 small' color='gray4'>{title}</StyledHeading>
                <StyledHeading className={`fw-bold mb-0 ${underline ? 'text-decoration-underline' : ''}`} color='gray1'>{data}</StyledHeading>
            </div>
        </div>
    )
}

export default function AppDetails() {

    const { info } = useSelector(store => store.data)

    const [time, setTime] = useState('')

    useEffect(() => {
        setTime(info?.startTime ? new Date(info.startTime).toLocaleString() : '')
    }, [info])

    return (
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

            {/* <div className='position-absolute' style={{ left: '-15px' }}>
                <Image
                    src={vector}
                    alt='muon'
                    className='img-fluid'
                />
            </div> */}
        </div>
    )
}
