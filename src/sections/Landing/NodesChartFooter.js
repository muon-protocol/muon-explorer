import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
    color: ${({ theme, color }) => theme.palette[color]};
`

const NodesChartFooterItem = ({ title, value, color }) => {
    return (
        <div className='d-flex justify-content-between align-items-center mb-2'>
            <span className='small'>{title}</span>
            <StyledSpan className='small fw-bold' color={color}>{value?.toLocaleString()}</StyledSpan>
        </div>
    )
}

export default function NodesChartFooter() {
    return (
        <div className='card-footer border-0 bg-transparent d-flex flex-column'>
            <NodesChartFooterItem
                title='Total Nodes:'
                value={2864}
                color='black'
            />
            <NodesChartFooterItem
                title='Active Nodes:'
                value={2632}
                color='primary1'
            />
            <NodesChartFooterItem
                title='Deactive Nodes:'
                value={232}
                color='gray5'
            />
        </div>
    )
}
