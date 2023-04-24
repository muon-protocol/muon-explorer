import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import { getSearchedApplications } from 'src/redux/ApplicationsSlice'
import { getSearchedRequests } from 'src/redux/RequestsSlice'
import { getSearchedNodes } from 'src/redux/NodesSlice'

const StyledDiv = styled.div`
    background-color: ${({ theme }) => theme.palette.white};
`

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.palette.primary1};

    & path{
        fill: ${({ theme }) => theme.palette.white};
    }
`

export default function LandingSearchbar() {

    const { pathname, push } = useRouter()

    const dispatch = useDispatch()

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!value) return
        try {
            setLoading(true)

            const req1 = dispatch(getSearchedApplications(value))
            const req2 = dispatch(getSearchedRequests(value))
            const req3 = dispatch(getSearchedNodes(value))

            const allRes = await Promise.all([req1, req2, req3])
            const results = allRes.map(i => i.payload)
            const foundApps = results[0]?.applications
            const foundReqs = results[1]?.requests
            const foundNodes = results[2]?.nodes

            if (foundApps?.length === 1 && !foundReqs?.length && !foundNodes?.length) {
                const appId = foundApps[0].id
                push(`/applications/${appId}`)
            }
            else if (pathname !== '/search') {
                push('/search')
            }

            setLoading(false)
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong')
            setLoading(false)
        }
    }

    const handleOnKeyDown = (e) => {
        if ((e.key === 'Enter' || e.code === 'NumpadEnter') && e.target.value) {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit()
        }
    }

    return (
        <StyledDiv className='rounded-pill d-flex align-items-center p-1'>
            <input
                className='form-control my-3 mx-4 bg-transparent border-0'
                type='text'
                placeholder='App Name / Req Address / Gateway Address / Node ID'
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleOnKeyDown}
            />
            <StyledButton
                className='border-0 rounded-circle p-2 me-1'
                disabled={!value}
                onClick={handleSubmit}
            >
                {loading ?
                    <Icon icon="eos-icons:loading" width={30} />
                    :
                    <Icon icon="material-symbols:search" width={30} />
                }
            </StyledButton>
        </StyledDiv>
    )
}
