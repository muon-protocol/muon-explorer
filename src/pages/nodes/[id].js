import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import Lottie from 'lottie-react'

import nodeImage2 from 'public/images/node-shape-2.png'
import nodeAnimation from 'public/animations/Nodes.json'

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card'
import Modal from 'src/components/Modal'
import Progress from 'src/components/Progress'
import Copy from 'src/components/Copy'

import { wrapper } from 'src/redux/store'
import { getSingleNode } from 'src/redux/NodesSlice'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import { dateDiff, fullFormat } from 'src/utils/times'

const StyledRow = styled.div`
	width: 90%;
	margin-left: auto;
	${({ theme }) => theme.breakpoints.md`
        width: 100%;
        margin-left: unset;
    `};
`

const StyledLottie = styled(Lottie)`
	position: absolute;
	left: -8.5rem;
	top: -8.2rem;
	width: 22rem;
	opacity: 0.4;
	z-index: -1;
	mix-blend-mode: luminosity;
	${({ theme }) => theme.breakpoints.md`
        display: none;
    `};
`

const StyledDevider = styled.div`
	height: 100%;
	width: 0;
	border: 1px dashed ${({ theme }) => theme.palette.white};
`

const StyledH5 = styled.h5`
	color: ${({ theme }) => theme.palette.primary4};
`

const StyledButton = styled.button`
	color: ${({ theme }) => theme.palette.primary1} !important;
	background-color: ${({ theme }) => theme.palette.primary5} !important;
	font-size: small;
	padding: 7px 17px;
`

const StyledH2 = styled.h2`
	color: ${({ theme }) => theme.palette.primary2};
`

const StyledP = styled.p`
	color: ${({ theme }) => theme.palette.primary2};
`

const StyledSpan = styled.span`
	color: ${({ theme }) => theme.palette.gray3};
`

const StyledAccordion = styled(Accordion)`
	& .accordion-button {
		border-radius: 1rem !important;
		color: ${({ theme }) => theme.palette.gray2};
		background-color: ${({ theme }) => theme.palette.white} !important;
		box-shadow: none;
		display: flex;
		justify-content: space-between;

		&:not(.collapsed)::after {
			transform: translateY(-50%) rotateZ(180deg);
		}

		&:after {
			background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2368687f'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
			position: absolute;
			top: 50%;
			right: 1rem;
			transform: translateY(-45%);
		}
		&:focus {
			box-shadow: none;
		}
	}
	& li {
		list-style: disc inside;
	}
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
	const [open, setOpen] = useState(false)
	const [downtimes, setDowntimes] = useState([])

	useEffect(() => {
		const data = node?.history
			.map((i) => ({ isOnline: i.isOnline, timestamp: i.timestamp }))
			.sort((a, b) => a.timestamp - b.timestamp)

		let ranges = []

		data?.forEach((item, index) => {
			if (!item.isOnline) {
				ranges.push({
					down: item.timestamp,
					up: data[index + 1]?.timestamp || null,
				})
			}
		})

		setDowntimes(ranges)
	}, [node?.history])

	return (
		<MainLayout title={`Node ${node?.node.id}`}>
			<section className='mb-4 position-relative overflow-hidden'>
				<Card color='gradient2'>
					<StyledRow className='row g-4 justify-content-center py-1'>
						<div className='col-xl-6 col-lg-7 col-12 col-12 mb-lg-0 mb-4'>
							<div className='row g-4 justify-content-between'>
								<NodeItem title='Node ID' text={node?.node.id} />
								<NodeItem
									title='Node Address'
									text={node?.node.nodeAddress.slice(0, 7) + '...' + node?.node.nodeAddress.slice(-7)}
									copy={node?.node.nodeAddress}
								/>
								<NodeItem
									title='Staker Address'
									text={node?.node.stakerAddress.slice(0, 7) + '...' + node?.node.stakerAddress.slice(-7)}
									copy={node?.node.stakerAddress}
								/>
								<NodeItem
									title='Peer ID'
									text={node?.node.peerId.slice(0, 6) + '...' + node?.node.peerId.slice(-6)}
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
									<span className='mb-3'>Uptime</span>
									<Progress value={node?.reward.onlinePercent} />
								</div>
								<div className='col-6 d-flex flex-column justify-content-between align-items-center'>
									<div className='d-flex flex-column align-items-center mb-3'>
										<span>Status</span>
										<StyledH5 className='mb-0 mt-2'>
											{node?.node?.tests?.networking &&
											node?.node?.tests?.peerInfo &&
											node?.node?.tests?.status
												? 'Active'
												: 'Inactive'}
										</StyledH5>
									</div>
									<StyledButton className='btn rounded-3 border-0 my-3' onClick={() => setShow(true)}>
										Details
									</StyledButton>
								</div>
							</div>
						</div>
					</StyledRow>
				</Card>
				<StyledLottie animationData={nodeAnimation} loop={true} />
			</section>

			<section className='mb-4'>
				<Card>
					<StyledRow className='row g-4 justify-content-center align-items-center py-4'>
						<div className='col-md-4 col-10'>
							<Image src={nodeImage2} alt='muon' className='img-fluid' />
						</div>
						<div className='col-md-8 col-12'>
							<StyledH2>Discover remarkable applications running on this node</StyledH2>
							<StyledP className='mb-0'>Will be here soon</StyledP>
						</div>
					</StyledRow>
				</Card>
			</section>

			<Modal show={show} onHide={setShow} title='Node Details'>
				<div className='d-flex flex-column'>
					<div className='d-flex justify-content-between border-bottom pb-3 px-3'>
						<span>Joined at</span>
						<span>{fullFormat(node?.node.startTime)}</span>
					</div>
					<StyledAccordion activeKey={open} onSelect={setOpen} flush>
						<Accordion.Item eventKey='0'>
							<Accordion.Header>
								<span>Down times</span>
								<span className='ms-auto me-4'>{downtimes.length} times</span>
							</Accordion.Header>
							<Accordion.Body className='pt-0'>
								<ul className='ps-1'>
									{downtimes.map((item, index) => (
										<li key={index} className='small mb-1'>
											{fullFormat(item.down)} until {item.up ? fullFormat(item.up) : 'now'}{' '}
											{item.up ? 'for ' + dateDiff(item.down, item.up) : null}
										</li>
									))}
								</ul>
							</Accordion.Body>
						</Accordion.Item>
					</StyledAccordion>
				</div>
			</Modal>
		</MainLayout>
	)
}
