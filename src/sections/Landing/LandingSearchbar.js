import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import { getSearchedData } from 'src/redux/SearchSlice'

const StyledDiv = styled.div`
	background-color: ${({ theme }) => theme.palette.white};
	width: ${({ landing }) => (landing ? '100%' : '26rem')};
	max-width: ${({ landing }) => (landing ? '100%' : '90vw')};
	border: ${({ theme, landing }) => (landing ? 'none' : `1px solid ${theme.palette.gray7}`)};
	& input {
		font-size: 13px;
		&::placeholder {
			font-size: ${({ landing }) => (landing ? 'normal' : 'small')};
		}
	}
`

const StyledButton = styled.button`
	background-color: ${({ theme }) => theme.palette.primary1};
	line-height: 10px;

	& path {
		fill: ${({ theme }) => theme.palette.white};
	}
`

export default function LandingSearchbar({ landing }) {
	const { pathname, push } = useRouter()

	const dispatch = useDispatch()

	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		if (!value) return
		try {
			setLoading(true)

			const { payload } = await dispatch(getSearchedData(value))
			const foundReqs = payload?.req
			const foundSpenders = payload?.spenderReqs
			const foundApps = payload?.apps
			const foundNodes = payload?.nodes

			if (foundApps?.length === 1 && !foundReqs?.length && !foundNodes?.length && !foundSpenders?.length) {
				const appId = foundApps[0].id
				push(`/applications/${appId}`)
			} else if (pathname !== '/search') {
				push('/search')
			}

			setLoading(false)
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong')
			setLoading(false)
		}
	}

	const handleOnKeyDown = (e) => {
		if ((e.key === 'Enter' || e.code === 'NumpadEnter') && e.target.value) {
			e.preventDefault()
			e.stopPropagation()
			handleSubmit()
		}
	}

	return (
		<StyledDiv className='rounded-pill d-flex align-items-center p-1' landing={landing}>
			<input
				className={`form-control my-${landing ? '3' : '0 py-0 pb-1'} mx-${
					landing ? '4' : '0'
				} bg-transparent border-0`}
				type='text'
				placeholder='App Name / Req ID / Spender Addr / Node ID'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleOnKeyDown}
			/>
			<StyledButton
				className={`border-0 rounded-circle p-${landing ? '2' : '1'} me-1`}
				disabled={!value}
				onClick={handleSubmit}
			>
				{loading ? (
					<Icon icon='eos-icons:loading' width={landing ? 30 : 20} />
				) : (
					<Icon icon='ri:search-line' width={landing ? 30 : 17} />
				)}
			</StyledButton>
		</StyledDiv>
	)
}
