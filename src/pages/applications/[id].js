import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import dynamic from 'next/dynamic'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import MainLayout from 'src/layouts/MainLayout'
import ApplicationTab from 'src/sections/Application/ApplicationTab'
import RequestsTab from 'src/sections/Application/RequestsTab'
import Card from 'src/components/Card'
import Copy from 'src/components/Copy'

import { wrapper } from 'src/redux/store'
import { useSelector } from 'react-redux'
import { getSingleApplication } from 'src/redux/ApplicationsSlice'
import { getRequestHistory } from 'src/redux/RequestsSlice'

const LineChart = dynamic(() => import('src/components/Chart/LineChart'), {
	loading: () => <p>loading ...</p>,
})
const ChartModal = dynamic(() => import('src/components/Modal/ChartModal'), { ssr: false })

const StyledSpan = styled.span`
	color: ${({ theme }) => theme.palette.label};
`

const StyledDiv = styled.div`
	background-color: ${({ theme }) => theme.palette.darkGreen};
	line-height: 10px;
	& path {
		fill: ${({ theme }) => theme.palette.white};
	}
`

const StyledDevider = styled.div`
	height: 100%;
	width: 0;
	border: 1px dashed ${({ theme }) => theme.palette.grayL1};
`

const StyledCol = styled.div`
	height: 200px;
	& svg {
		color: ${({ theme }) => theme.palette.label};
	}
`

const StyledTabs = styled(Tabs)`
	border: none;
	padding: 8px 0;

	.nav-link {
		background-color: transparent !important;
		border: none;
		color: ${({ theme }) => theme.palette.grayL1};
		padding: 10px 0.5rem;
		margin-left: 1rem;

		&.active {
			color: ${({ theme }) => theme.palette.text};
			font-weight: bold;
		}
	}

	& + .tab-content {
		border-radius: 1rem;
	}
`

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
	const res = await store.dispatch(getSingleApplication(query.id))
	if (res.payload?.status !== 200) {
		return {
			notFound: true,
		}
	}
	const res1 = await store.dispatch(getRequestHistory({ range: 14, app: query.id }))
	return {
		props: {
			staticRequestHistory: res1.payload?.history || [],
		},
	}
})

export default function ApplicationPage({ staticRequestHistory }) {
	const { app } = useSelector((store) => store.applications)

	const [activeTab, setActiveTab] = useState('application')
	const [openModal, setOpenModal] = useState(false)

	return (
		<MainLayout title={app?.name + ' App'}>
			<section className='mb-4'>
				<Card color='primaryL1_25'>
					<div className='row g-lg-1 g-4'>
						<div className='col-lg-8 col-12 align-self-center'>
							<div className='row g-md-5 g-4 mb-3 justify-content-between'>
								<div className='col-md-3 col-sm-6 col-12 d-flex'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>App Name</StyledSpan>
										<div className='d-flex align-items-center mt-2'>
											<h6 className='medium mb-0'>{app?.name}</h6>
											<Copy text={app?.id} />
										</div>
									</div>
								</div>
								<div className='col-md-3 col-sm-6 col-12 d-flex justify-content-md-center justify-content-start'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>App ID</StyledSpan>
										<div className='d-flex align-items-center mt-2'>
											<h6 className='medium mb-0'>
												{app?.data.appId.slice(0, 4) +
													'...' +
													app?.data.appId.slice(-4)}
											</h6>
											<Copy text={app?.data.appId} />
										</div>
									</div>
								</div>
								<div className='col-md-6 col-12 d-flex justify-content-md-end justify-content-start'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>
											Public key (Owner / X / yParity)
										</StyledSpan>
										<div className='d-flex align-items-center mt-2'>
											<h6 className='medium mb-0'>
												{app?.data.context
													? (app?.data.context.seed?.slice(0, 4) ?? '') +
													  '...' +
													  (app?.data.context.seed?.slice(-4) ?? '') +
													  ' / ' +
													  (app?.data.context.tss?.publicKey?.x?.slice(0, 4) ?? '') +
													  '...' +
													  (app?.data.context.tss?.publicKey?.x?.slice(-4) ?? '') +
													  ' / ' +
													  (app?.data.context.tss?.publicKey?.yParity ?? '')
													: 'No data'}
											</h6>
											{app?.data.context && (
												<Copy
													text={
														(app?.data.context.seed ?? '') +
														' / ' +
														(app?.data.context.tss?.publicKey?.x ?? '') +
														' / ' +
														(app?.data.context.tss?.publicKey?.yParity ?? '')
													}
												/>
											)}
										</div>
									</div>
								</div>
								<div className='col-md-4 col-sm-6 col-12 d-flex'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>Seed</StyledSpan>
										<div className='d-flex align-items-center mt-2'>
											<h6 className='medium mb-0'>
												{app?.data.context
													? (app?.data.context.tss?.publicKey?.address?.slice(0, 5) ??
															'') +
													  '...' +
													  (app?.data.context.tss?.publicKey?.address?.slice(-5) ??
															'')
													: 'No data'}
											</h6>
											{app?.data.context && (
												<Copy text={app?.data.context.tss?.publicKey?.address ?? ''} />
											)}
										</div>
									</div>
								</div>
								<div className='col-md-4 col-sm-6 col-12 d-flex justify-content-md-center justify-content-start'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>Threshold</StyledSpan>
										<h6 className='medium mb-0 mt-2'>
											{app?.data.context
												? (app?.data.context.tss?.threshold?.t ?? '') +
												  ' / ' +
												  (app?.data.context.tss?.threshold?.max ?? '')
												: 'No data'}
										</h6>
									</div>
								</div>
								<div className='col-md-4 col-sm-6 col-12 d-flex justify-content-md-end justify-content-start'>
									<div className='d-flex flex-column'>
										<StyledSpan className='small'>Status</StyledSpan>
										<div className='d-flex align-items-center mt-2'>
											<h6 className='medium mb-0'>{app?.data.status}</h6>
											{app?.data.status === 'DEPLOYED' && (
												<StyledDiv className='rounded-3 ms-2'>
													<Icon
														icon='material-symbols:check-small-rounded'
														width={22}
													/>
												</StyledDiv>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-1 d-none d-lg-block'>
							<StyledDevider className='mx-auto' />
						</div>
						<StyledCol className='col-lg-3 col-12 d-flex flex-column justify-content-between'>
							<div className='d-flex align-items-center justify-content-between'>
								<StyledSpan className='small'>
									{app?.name} App Requests History in 14 days
								</StyledSpan>
								<button className='btn p-0 border-0' onClick={() => setOpenModal(true)}>
									<Icon icon='solar:maximize-square-broken' width={20} />
								</button>
							</div>
							<LineChart data={staticRequestHistory} length={14} small />
						</StyledCol>
					</div>
				</Card>
			</section>

			<section className='mb-4'>
				<Card color='grayD2' shrink>
					<StyledTabs activeKey={activeTab} onSelect={(e) => setActiveTab(e)} unmountOnExit>
						<Tab eventKey='application' title='Application'>
							<ApplicationTab />
						</Tab>

						<Tab eventKey='requests' title='Requests'>
							<RequestsTab />
						</Tab>
					</StyledTabs>
				</Card>
			</section>

			<ChartModal openModal={openModal} setOpenModal={setOpenModal} app={app} />
		</MainLayout>
	)
}
