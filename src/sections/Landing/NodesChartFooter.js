import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const NodesChartFooterItem = ({ className, title, value, color }) => {
    return (
        <div className={'col-xl-4 col-md-3 col-sm-4 col-8 ' + className}>
            <div className='rounded-3 d-flex flex-column py-2 px-3'>
                <span className='small'>{title}</span>
                <h6 className='fw-bold mb-0 mt-2 align-self-end' color={color}>{value?.toLocaleString('en')}</h6>
            </div>
        </div>
    )
}

const StyledItem = styled(NodesChartFooterItem)`
    & div.d-flex{
        background-color: ${({theme}) => theme.palette.primary8};
    }
    & h6{
        color: ${({ theme, color }) => theme.palette[color]};
    }
`

export default function NodesChartFooter() {

    const { totalNodesCount, activeNodesCount, deactiveNodesCount } = useSelector(store => store.nodes)

    return (
        <div className='card-footer border-0 bg-transparent'>
            <div className='row g-4 justify-content-around'>
                <StyledItem
                    title='Total Nodes:'
                    value={totalNodesCount}
                    color='gray1'
                />
                <StyledItem
                    title='Active Nodes:'
                    value={activeNodesCount}
                    color='primary1'
                />
                <StyledItem
                    title='Inactive Nodes:'
                    value={deactiveNodesCount}
                    color='gray1'
                />
            </div>
        </div>
    )
}
