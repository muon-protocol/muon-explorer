import React from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { toast } from 'react-toastify';

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.palette.primary6} !important;
    padding: 4px !important;
    z-index: 1000;
    line-height: 10px;
    & svg{
        color: ${({ theme }) => theme.palette.white};;
    }
`

export default function Copy({ text }) {

    const handleCopy = () => {
        navigator.clipboard?.writeText(text)
        toast.success('Copied to clipboard successfully')
    }

    return (
        <StyledButton className='btn rounded-2 border-0 ms-2' onClick={handleCopy}>
            <Icon icon="ion:documents-outline" />
        </StyledButton>
    )
}