import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import shape1 from 'public/images/shape1.png'
import shape2 from 'public/images/shape2.png'
import shape3 from 'public/images/shape3.png'

const StyledFooterCard = styled.div`
    border-top: 2px solid ${({theme}) => theme.palette.gray7};
`

const StyledSpan = styled.span`
    color: ${({theme}) => theme.palette.primary1};
`

const RequestsChartFooterItem = ({ image, title, value, last }) => {
    return (
        <div className={`d-flex align-items-center ${!last && 'mb-4 mb-sm-0'}`}>
            <div className='me-4'>
                <Image src={image} alt='muon' className='img-fluid' />
            </div>
            <div className='d-flex flex-column'>
                <span className='small'>{title}</span>
                <StyledSpan className='fw-bold'>{value?.toLocaleString()}</StyledSpan>
            </div>
        </div>
    )
}

export default function RequestsChartFooter() {
    return (
        <StyledFooterCard className='card-footer bg-transparent'>
            <div className='d-flex flex-column flex-sm-row justify-content-between pt-2 px-md-4'>
                <RequestsChartFooterItem
                    image={shape1}
                    title='Applications'
                    value={130}
                />
                <RequestsChartFooterItem
                    image={shape2}
                    title='Active Nodes'
                    value={2632}
                />
                <RequestsChartFooterItem
                    image={shape3}
                    title='Requests'
                    value={242384}
                />
            </div>
        </StyledFooterCard>
    )
}
