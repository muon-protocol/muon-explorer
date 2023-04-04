import React from 'react'
import { Icon } from '@iconify/react'
import styled, { useTheme } from 'styled-components'

const StyledSpan = styled.span`
    color: ${({theme}) => theme.palette.primary};
`

const StyledSpan2 = styled.span`
    color: ${({theme}) => theme.palette.primary2};
`

export default function Pagination({ LIMIT, dataLength, total, loading, page, setPage, inputValue }) {

    const theme = useTheme()

    const handlePrevPage = () => {
        if (page !== 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (dataLength) {
            setPage(page + 1)
        }
    }

    return (
        <div className='card-footer bg-transparent border-0'>
            <div className='d-flex justify-content-between align-items-center'>
                <StyledSpan2 className='small'>
                    {(LIMIT * page + 1)}-{dataLength + (page * LIMIT)} / {total}
                </StyledSpan2>

                <div className='d-flex align-items-center'>
                    <button
                        className='btn border-0 p-0'
                        onClick={handlePrevPage}
                        disabled={page === 0 || loading}
                    >
                        <Icon
                            icon="material-symbols:arrow-left-rounded"
                            width={50}
                            color={page === 0 ? theme.palette.primary3 : theme.palette.primary2}
                        />
                    </button>
                    <StyledSpan className='small'>{inputValue ? '1' : page + 1} / {Math.ceil(total / LIMIT)}</StyledSpan>
                    <button
                        className='btn border-0 p-0'
                        onClick={handleNextPage}
                        disabled={page + 1 === Math.ceil(total / LIMIT) || loading}
                    >
                        <Icon
                            icon="material-symbols:arrow-right-rounded"
                            width={50}
                            color={page + 1 === Math.ceil(total / LIMIT) ? theme.palette.primary3 : theme.palette.primary2}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
