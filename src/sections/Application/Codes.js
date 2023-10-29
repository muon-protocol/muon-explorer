import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'

const StyledAccordion = styled(Accordion)`
	& .accordion-button {
		border-radius: 1rem !important;
		color: ${({ theme }) => theme.palette.text};
		background-color: transparent;
		box-shadow: none;

		&:after {
			background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23747B87'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
		}
		&:focus {
			box-shadow: none;
		}
	}
`

const StyledItem = styled(Accordion.Item)`
	background-color: transparent;
	border: 1px dashed ${({ theme }) => theme.palette.grayL1} !important;
`

const StyledBody = styled(Accordion.Body)`
	background-color: transparent;
	pre {
		background-color: transparent;
	}
`

export default function Codes({ openCodes, setOpenCodes }) {
	const { app } = useSelector((store) => store.applications)

	useEffect(() => {
		const highlight = async () => {
			await Prism.highlightAll()
		}
		highlight()
	}, [])

	const handleCode = (e) => {
		const found = openCodes.find((i) => i === e)
		if (found) {
			const filtered = openCodes.filter((i) => i !== e)
			setOpenCodes(filtered)
		} else {
			setOpenCodes([...openCodes, e])
		}
	}

	return (
		<StyledAccordion activeKey={openCodes} onSelect={handleCode}>
			{app?.codes.length ? (
				app?.codes.map((item, index) => (
					<StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
						<Accordion.Header>{item.name}</Accordion.Header>
						<StyledBody>
							<pre className='my-0 p-0 language-javascript'>
								<code>{item.code}</code>
							</pre>
						</StyledBody>
					</StyledItem>
				))
			) : (
				<div className='text-center p-3'>
					<span className='small'>No codes found</span>
				</div>
			)}
		</StyledAccordion>
	)
}
