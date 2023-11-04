import React, { useState } from 'react'

import Modal from '.'
import ChartPills from 'src/sections/Landing/ChartPills'
import LineChart from '../Chart/LineChart'

import { useSelector } from 'react-redux'

export default function ChartModal({ openModal, setOpenModal, app }) {
	const { requestsHistory } = useSelector((store) => store.requests)

	const [length, setLength] = useState(1)

	return (
		<Modal
			show={openModal}
			onHide={setOpenModal}
			size='xl'
			title={`${app?.name} App Requests History`}
		>
			<div className='d-flex justify-content-end w-100 mb-2 px-4'>
				<ChartPills active={length} setActive={setLength} app={app?.id} />
			</div>
			<div className='px-3 mb-3'>
				<LineChart data={requestsHistory} length={length} />
			</div>
		</Modal>
	)
}
