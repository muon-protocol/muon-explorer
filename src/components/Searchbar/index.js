import React from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    background-color: ${({ theme }) => theme.palette.gray8};
    width: 20rem;
    ${({ theme }) => theme.breakpoints.xs`
        width: 100%;
    `};
    & path{
        fill: ${({theme}) => theme.palette.gray5};
    }
`

export default function Searchbar({ placeholder, value, setValue }) {
    return (
        <StyledDiv className='d-flex align-items-center rounded-pill py-1 px-3'>
            <Icon icon="ri:search-line" width={18} />
            <input
                type='search'
                placeholder={placeholder}
                className='form-control bg-transparent border-0 py-1 pe-0'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </StyledDiv>
    )
}
