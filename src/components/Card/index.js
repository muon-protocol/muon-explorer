import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

const StyledCard = styled.div`
    background: ${({ theme, color }) => theme.palette[color]};
`

const StyledLink = styled(Link)`
    & span{
        color: ${({ theme }) => theme.palette.secondary1};
    }
    & path{
        fill: ${({ theme }) => theme.palette.secondary1};
    }
`

export default function Card(props) {

    const {
        children, color = 'bg2', link = '/',
        Header = 'h6', title, action, actionContent,
        footerContent, shrink } = props

    return (
        <StyledCard className={`card border-0 rounded-4 ${shrink ? 'p-0' : 'p-3'} position-relative overflow-hidden h-100`} color={color}>

            {title &&
                <div className='card-header border-0 bg-transparent d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center'>
                    <Header className='mb-sm-0 fw-bold mb-3'>{title}</Header>
                    {action === 'more' &&
                        <StyledLink href={link}>
                            <span className='small me-1'>{actionContent}</span>
                            <Icon icon="material-symbols:arrow-right-alt-rounded" />
                        </StyledLink>
                    }
                    {(action === 'pills' || action === 'search') && actionContent}
                </div>
            }

            <div className={`card-body pb-0 ${shrink ? 'p-0' : ''}`}>
                {children}
            </div>

            {footerContent}
        </StyledCard>
    )
}
