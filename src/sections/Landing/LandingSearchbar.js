import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    background-color: ${({theme}) => theme.palette.white};
    box-shadow: ${({theme}) => theme.shadows.s1};
`

const StyledButton = styled.button`
    background-color: ${({theme}) => theme.palette.primary1};

    & path{
        fill: ${({theme}) => theme.palette.white};
    }
`

export default function LandingSearchbar() {

    const [value, setValue] = useState('')

    return (
        <StyledDiv className='rounded-pill d-flex align-items-center p-1'>
            <input
                className='form-control my-3 mx-4 bg-transparent border-0'
                type='text'
                placeholder='Search by Address / Application Name / Node ID / Request ID'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <StyledButton className='border-0 rounded-circle p-2 me-1'>
                <Icon icon="material-symbols:search" width={30} />
            </StyledButton>
        </StyledDiv>
    )
}
