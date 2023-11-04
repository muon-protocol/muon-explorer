import React, { useEffect, useState } from 'react'
import { dateDiff, fullFormat } from 'src/utils/times'
import styled from 'styled-components'

import Modal from '.'
import { Accordion } from 'react-bootstrap'

const StyledAccordion = styled(Accordion)`
	& .accordion-item {
		background-color: transparent !important;

		.accordion-button {
			border-radius: 1rem !important;
			color: ${({ theme }) => theme.palette.primaryL2};
			background-color: transparent !important;
			box-shadow: none;
			font-size: 18px;
			display: flex;
			justify-content: space-between;

			&:not(.collapsed)::after {
				transform: translateY(-50%) rotateZ(180deg);
			}

			&:after {
				background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2368687f'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
				position: absolute;
				top: 50%;
				right: 0.5rem;
				transform: translateY(-45%);
			}
			&:focus {
				box-shadow: none;
			}
		}
	}
	& li {
		list-style: disc inside;
		color: ${({ theme }) => theme.palette.text};
	}
`

const StyledSpan = styled.span`
	color: ${({ theme }) => theme.palette.label};
`

export default function DownTimesModal({ show, setShow, node }) {
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
		<Modal show={show} onHide={setShow} title='Node Details'>
			<div className='d-flex flex-column'>
				<div className='d-flex justify-content-between border-bottom pb-3 px-3'>
					<StyledSpan>Joined at</StyledSpan>
					<StyledSpan>{fullFormat(node?.node.startTime)}</StyledSpan>
				</div>
				<StyledAccordion activeKey={open} onSelect={setOpen} flush>
					<Accordion.Item eventKey='0'>
						<Accordion.Header>
							<span>Down times</span>
							<span className='ms-auto me-4'>{downtimes.length} times</span>
						</Accordion.Header>
						<Accordion.Body className='pt-0'>
							<ul className='ps-0'>
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
	)
}
