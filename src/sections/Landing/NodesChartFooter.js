import React from 'react'
import { useSelector } from 'react-redux'
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

    const { totalNodes, activeNodes, deactiveNodes } = useSelector(store => store.nodes)

    return (
        <div className='card-footer border-0 bg-transparent d-flex flex-column'>
            <NodesChartFooterItem
                title='Total Nodes:'
                value={totalNodes}
                color='black'
            />
            <NodesChartFooterItem
                title='Active Nodes:'
                value={activeNodes}
                color='primary1'
            />
            <NodesChartFooterItem
                title='Deactive Nodes:'
                value={deactiveNodes}
                color='gray5'
            />
        </div>
    )
}
