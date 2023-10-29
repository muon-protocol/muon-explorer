import React, { useState, useEffect } from 'react'
import { dateTimeFormat } from 'src/utils/times'
import Link from 'next/link'

import { LIMIT } from 'src/constants/applications'

import useSearch from 'src/hooks/useSearch'
import useInterval from 'src/hooks/useInterval'

import Card from 'src/components/Card'
import Table from 'src/components/Table'
import Pagination from 'src/components/Pagination'
import Searchbar from 'src/components/Searchbar'

import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from 'src/redux/RequestsSlice'

export default function RequestsTab() {
	const { app } = useSelector((store) => store.applications)
	const { requests, requestsLoading, totalReqs } = useSelector((store) => store.requests)

	const dispatch = useDispatch()

	const [page, setPage] = useState(0)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		dispatch(getRequests({ page: page + 1, search: inputValue, app: app.id }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, page])

	useInterval({
		deps: [inputValue, page],
		delay: 5000,
		func: () => dispatch(getRequests({ page: page + 1, search: inputValue, app: app.id })),
	})

	useSearch({
		inputValue,
		delay: 1500,
		searchFunc: () => {
			if (page === 0) {
				dispatch(getRequests({ page: page + 1, search: inputValue, app: app.id }))
			} else {
				setPage(0)
			}
		},
	})

	return (
		<Card
			title='Latest Requests'
			action='search'
			actionContent={
				<Searchbar
					value={inputValue}
					setValue={setInputValue}
					placeholder='Req ID / Spender Addr'
				/>
			}
			footerContent={
				<Pagination
					page={page}
					setPage={setPage}
					LIMIT={LIMIT}
					loading={requestsLoading}
					dataLength={requests.length}
					inputValue={inputValue}
					total={totalReqs}
				/>
			}
		>
			<Table
				head={[
					'Req ID',
					'From',
					'Target App',
					'Method',
					'Gateway Address',
					'Start Time',
					'Confirm Time',
				]}
			>
				{!requests.length ? (
					<tr>
						<td className='small text-center fw-bold pt-4' colSpan={7}>
							Nothing found
						</td>
					</tr>
				) : (
					requests.map((item, index) => (
						<tr key={index}>
							<td className='small'>
								<Link href={`/requests/${item.reqId}`}>
									{item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}
								</Link>
							</td>
							<td className='small' style={{ minWidth: '10rem' }}>
								{item.data?.fee?.spender?.address ? (
									<Link href={`/requests/spender/${item.data?.fee?.spender?.address}`}>
										{item.data?.fee?.spender?.address.slice(0, 10) +
											'...' +
											item.data?.fee?.spender?.address.slice(-10)}
									</Link>
								) : (
									''
								)}
							</td>
							<td className='small'>
								<Link href={`/applications/${item.app}`}>{item.app}</Link>
							</td>
							<td className='small'>{item.method}</td>
							<td className='small'>
								<Link href={`/nodes/${item.gwAddress}`}>
									{item.gwAddress.slice(0, 10) + '...' + item.gwAddress.slice(-10)}
								</Link>
							</td>
							<td className='small'>{dateTimeFormat(item?.startedAt)}</td>
							<td className='small text-end'>{dateTimeFormat(item?.confirmedAt)}</td>
						</tr>
					))
				)}
			</Table>
		</Card>
	)
}
