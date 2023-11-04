import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { dateTimeFormat } from 'src/utils/times'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import { LIMIT } from 'src/constants/applications'

import useSearch from 'src/hooks/useSearch'

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card'
import Table from 'src/components/Table'
import Pagination from 'src/components/Pagination'
import Searchbar from 'src/components/Searchbar'
import Loader from 'src/components/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getActiveNodes, getAllNodes, getDeactiveNodes } from 'src/redux/NodesSlice'
import { wrapper } from 'src/redux/store'

const PieChart = dynamic(() => import('src/components/Chart/PieChart'), {
	loading: () => <p>loading ...</p>,
	ssr: false,
})

const StyledDevider = styled.div`
	width: 100%;
	border-top: 1px dashed ${({ theme }) => theme.palette.grayL1};
`

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.palette.secondary} !important;
`

const StyledSpan = styled.span`
	color: ${({ theme }) => theme.palette.label};
`

const StyledSpan2 = styled.span`
	color: ${({ theme }) => theme.palette.gray};
`

const StyledH3 = styled.h3`
	color: ${({ theme }) => theme.palette.primaryText};
`

const StyledH5 = styled.h5`
	color: ${({ theme }) => theme.palette.primaryText};
	font-weight: bold;
`

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
	const req1 = store.dispatch(getAllNodes({}))
	const req2 = store.dispatch(getActiveNodes({}))
	const req3 = store.dispatch(getDeactiveNodes({}))
	const allRes = await Promise.all([req1, req2, req3])
	return {
		props: {
			total: allRes[0].payload?.total_count,
		},
	}
})

export default function Nodes({ total }) {
	const { nodes, loading, totalNodesCount, deactiveNodesCount, activeNodesCount } = useSelector(
		(store) => store.nodes
	)

	const dispatch = useDispatch()

	const [page, setPage] = useState(0)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		dispatch(getAllNodes({ page: page + 1, q: inputValue }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, page])

	useSearch({
		inputValue,
		delay: 1500,
		searchFunc: () => {
			if (page === 0) {
				dispatch(getAllNodes({ page: page + 1, q: inputValue }))
			} else {
				setPage(0)
			}
		},
	})

	return (
		<MainLayout title='Nodes'>
			<section className='mb-4 position-relative overflow-hidden'>
				<Card color='primaryL1_25'>
					<div className='row g-2 justify-content-end py-1 px-xl-5'>
						<div className='col-lg-8 col-12 d-flex flex-column justify-content-center me-lg-4'>
							<div className='row g-4 justify-content-lg-start justify-content-between'>
								<div className='col-md-4 col-12 d-flex align-items-end'>
									<StyledSpan className='me-xl-3 me-lg-2 me-3'>Total Nodes</StyledSpan>
									<h3 className='fw-bold mb-0'>{total}</h3>
								</div>
								<div className='col-md-7 col-12 d-flex align-items-end justify-content-lg-start justify-content-md-end ms-lg-4 ps-xl-4'>
									<StyledSpan className='me-xl-3 me-lg-2 me-3'>Active Nodes</StyledSpan>
									<StyledH3 className='fw-bold mb-0'>
										{activeNodesCount} (
										{activeNodesCount && total
											? ((activeNodesCount / total) * 100).toFixed(2)
											: 0}
										%)
									</StyledH3>
								</div>
							</div>
							<div className='w-100 my-4'>
								<StyledDevider />
							</div>
							<div className='row g-4'>
								<div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
									<StyledSpan className='mb-2'>Tier - 1 (Starter nodes)</StyledSpan>
									<div className='d-flex align-items-center fw-bold'>
										<h5 className='me-2'>{total}</h5>
										<StyledH5>({activeNodesCount})</StyledH5>
									</div>
								</div>
								<div className='col-md-4 col-sm-6 col-12 d-flex justify-content-lg-center'>
									<div className='d-flex flex-column'>
										<StyledSpan className='mb-2'>Tier - 2 (Pro nodes)</StyledSpan>
										<div className='d-flex align-items-center fw-bold'>
											<h5 className='me-2'>0</h5>
											<StyledH5>(0)</StyledH5>
										</div>
									</div>
								</div>
								<div className='col-md-4 col-sm-6 col-12 d-flex justify-content-lg-end'>
									<div className='d-flex flex-column'>
										<StyledSpan className='mb-2'>Tier - 3 (Master nodes)</StyledSpan>
										<div className='d-flex align-items-center fw-bold'>
											<h5 className='me-2'>0</h5>
											<StyledH5>(0)</StyledH5>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-3 col-12 d-flex justify-content-center me-lg-3'>
							<PieChart data={[activeNodesCount || 2, deactiveNodesCount || 1]} />
						</div>
					</div>
				</Card>
			</section>

			<section className='mb-4'>
				<Card
					title={process.env.NETWORK + ' Nodes'}
					action='search'
					actionContent={
						<Searchbar value={inputValue} setValue={setInputValue} placeholder='Node ID' />
					}
					footerContent={
						<Pagination
							LIMIT={LIMIT}
							dataLength={nodes.length}
							inputValue={inputValue}
							page={page}
							setPage={setPage}
							loading={loading}
							total={totalNodesCount}
						/>
					}
				>
					<Table head={['Node ID', 'Status', 'Tier', 'Start Time', '']}>
						{loading ? (
							<tr>
								<td colSpan={7}>
									<Loader />
								</td>
							</tr>
						) : !nodes.length ? (
							<tr>
								<td className='small text-center fw-bold pt-4' colSpan={7}>
									Nothing found
								</td>
							</tr>
						) : (
							nodes.map((item, index) => (
								<tr key={index}>
									<td className='small'>{item.id}</td>
									<td className='small pe-md-4'>
										{item?.tests?.networking &&
										item?.tests?.peerInfo &&
										item?.tests?.status ? (
											<span>Active</span>
										) : (
											<StyledSpan2>Inactive</StyledSpan2>
										)}
									</td>
									<td className='small pe-md-4'>Tier-1 (Starter)</td>
									<td className='small pe-md-4'>{dateTimeFormat(item.startTime)}</td>
									<td className='small text-end'>
										<StyledLink
											href={`/nodes/${item.id}`}
											className='text-decoration-underline'
										>
											View details
										</StyledLink>
									</td>
								</tr>
							))
						)}
					</Table>
				</Card>
			</section>
		</MainLayout>
	)
}
