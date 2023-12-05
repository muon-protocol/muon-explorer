import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import { themeStatImageHandler } from 'src/utils/helpers'

const StyledFooterCard = styled.div`
	border-top: 2px solid ${({ theme }) => theme.palette.white_50};
	color: ${({ theme }) => theme.palette.label};
`

const StyledH5 = styled.h5`
	color: ${({ theme }) => theme.palette.statValue};
`

const RequestsChartFooterItem = ({ image, title, value, last }) => {
	return (
		<div className={`d-flex align-items-center ${!last && 'mb-4 mb-sm-0'}`}>
			<div className='me-4'>
				<Image src={image} alt='muon' className='img-fluid' />
			</div>
			<div className='d-flex flex-column'>
				<span className='small mb-2'>{title}</span>
				<StyledH5 className='fw-bold mb-0'>{value?.toLocaleString('en')}</StyledH5>
			</div>
		</div>
	)
}

export default function RequestsChartFooter() {
	const { totalApps } = useSelector((store) => store.applications)
	const { requestsHistory } = useSelector((store) => store.requests)
	const { activeNodesCount } = useSelector((store) => store.nodes)

	const [sum, setSum] = useState(0)

	useEffect(() => {
		if (requestsHistory.length) {
			let total = 0
			requestsHistory.forEach((i) => {
				total += i
			})
			setSum(total)
		}
	}, [requestsHistory])

	return (
		<StyledFooterCard className='card-footer bg-transparent'>
			<div className='d-flex flex-column flex-sm-row justify-content-between pt-2 px-md-4'>
				<RequestsChartFooterItem
					image={themeStatImageHandler(1)}
					title='Applications'
					value={totalApps}
				/>
				<RequestsChartFooterItem
					image={themeStatImageHandler(2)}
					title='Active Nodes'
					value={activeNodesCount}
				/>
				<RequestsChartFooterItem
					image={themeStatImageHandler(3)}
					title='Requests'
					value={sum}
				/>
			</div>
		</StyledFooterCard>
	)
}
