import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import nodeImage2 from 'public/images/node-shape-2.png'

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card'
import Progress from 'src/components/Progress'
import Copy from 'src/components/Copy'
import DownTimesModal from 'src/components/Modal/DownTimesModal'

import { wrapper } from 'src/redux/store'
import { getSingleNode } from 'src/redux/NodesSlice'
import { useSelector } from 'react-redux'

const StyledDevider = styled.div`
	height: 100%;
	width: 0;
	border: 1px dashed ${({ theme }) => theme.palette.grayL1};
`

const StyledH5 = styled.h5`
	color: ${({ theme, active }) => theme.palette[active ? 'green' : 'red']};
`

const StyledButton = styled.button`
	color: ${({ theme }) => theme.palette.primaryMain} !important;
	background-color: ${({ theme }) => theme.palette.primaryL3} !important;
	font-size: small;
	padding: 7px 17px;
`

const StyledDiv = styled.div`
	color: ${({ theme }) => theme.palette.primaryL2};
`

const StyledSpan = styled.span`
	color: ${({ theme }) => theme.palette.label};
`

const NodeItem = ({ title, text, copy }) => {
	return (
		<div className='col-sm-6 col-10 d-flex flex-column'>
			<StyledSpan className='small'>{title}</StyledSpan>
			<div className='d-flex align-items-center mt-2'>
				<h5 className='mb-0 fw-bold'>{text}</h5>
				{copy && <Copy text={copy} />}
			</div>
		</div>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
	const res = await store.dispatch(getSingleNode(query.id))
	if (!res.payload?.success) {
		return {
			notFound: true,
		}
	}
	return {
		props: {},
	}
})

export default function NodePage() {
	const { node } = useSelector((store) => store.nodes)

	const [show, setShow] = useState(false)

	return (
		<MainLayout title={`Node ${node?.node.id}`}>
			<section className='mb-4 position-relative overflow-hidden'>
				<Card color='primaryL1_25'>
					<div className='row g-4 justify-content-center py-1 px-md-5'>
						<div className='col-xl-6 col-lg-7 col-12 col-12 mb-lg-0 mb-4'>
							<div className='row g-4 justify-content-between'>
								<NodeItem title='Node ID' text={node?.node.id} />
								<NodeItem
									title='Node Address'
									text={
										node?.node.nodeAddress.slice(0, 7) +
										'...' +
										node?.node.nodeAddress.slice(-7)
									}
									copy={node?.node.nodeAddress}
								/>
								<NodeItem
									title='Staker Address'
									text={
										node?.node.stakerAddress.slice(0, 7) +
										'...' +
										node?.node.stakerAddress.slice(-7)
									}
									copy={node?.node.stakerAddress}
								/>
								<NodeItem
									title='Peer ID'
									text={
										node?.node.peerId.slice(0, 6) + '...' + node?.node.peerId.slice(-6)
									}
									copy={node?.node.peerId}
								/>
							</div>
						</div>
						<div className='col-1 d-none d-lg-block'>
							<StyledDevider className='mx-auto' />
						</div>
						<div className='col-lg-4 col-12 col-sm-10 col-12'>
							<div className='row g-4'>
								<div className='col-6 d-flex flex-column justify-content-between align-items-center'>
									<StyledSpan className='mb-3'>Uptime</StyledSpan>
									<Progress value={node?.reward.onlinePercent} />
								</div>
								<div className='col-6 d-flex flex-column justify-content-between align-items-center'>
									<div className='d-flex flex-column align-items-center mb-3'>
										<StyledSpan>Status</StyledSpan>
										<StyledH5
											className='mb-0 mt-2'
											active={
												node?.node?.tests?.networking &&
												node?.node?.tests?.peerInfo &&
												node?.node?.tests?.status
											}
										>
											{node?.node?.tests?.networking &&
											node?.node?.tests?.peerInfo &&
											node?.node?.tests?.status
												? 'Active'
												: 'Inactive'}
										</StyledH5>
									</div>
									<StyledButton
										className='btn rounded-3 border-0 my-3'
										onClick={() => setShow(true)}
									>
										Details
									</StyledButton>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</section>

			<section className='mb-4'>
				<Card>
					<div className='row g-4 justify-content-center align-items-center py-4 px-sm-5'>
						<div className='col-md-4 col-10 text-center'>
							<Image src={nodeImage2} alt='muon' className='img-fluid' />
						</div>
						<StyledDiv className='col-md-8 col-12 pe-5'>
							<h1>Discover remarkable applications running on this node</h1>
							<p className='mb-0'>Will be here soon</p>
						</StyledDiv>
					</div>
				</Card>
			</section>

			<DownTimesModal show={show} setShow={setShow} node={node} />
		</MainLayout>
	)
}
