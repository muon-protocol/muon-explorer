import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'

import Accordion from 'react-bootstrap/Accordion'
import Fade from 'react-bootstrap/Fade'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { methodQuery } from 'src/redux/ApplicationsSlice'

// import { handleRequest } from 'src/utils/requestMuonWallet'

import Prism from 'prismjs'
import 'prismjs/components/prism-json'

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

const StyledLabel = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 0 50rem 50rem 0;
	width: 8.8rem;
	color: ${({ theme }) => theme.palette.text};
	background-color: ${({ theme }) => theme.palette.inputNameBg};
	& span:first-of-type {
		text-transform: capitalize;
	}
	${({ theme }) => theme.breakpoints.sm`
        top: -50px;
        right: unset;
        left: 0;
        border-radius: 5rem;
    `}
`

const StyledInput = styled.input`
	height: 42px;
	background-color: ${({ theme }) => theme.palette.input} !important;
	color: ${({ theme }) => theme.palette.label} !important;
	&::placeholder {
		color: ${({ theme }) => theme.palette.label} !important;
	}
`

const StyledButton = styled.button`
	height: 42px;
	width: 8.8rem;
	font-size: small;
	letter-spacing: 0.6px;
	color: ${({ theme }) => theme.palette.white} !important;
	background-color: ${({ theme }) => theme.palette.button} !important;
	& path {
		fill: ${({ theme }) => theme.palette.white};
	}
`

const StyledButton2 = styled.button`
	height: 42px;
	letter-spacing: 0.6px;
	font-size: small;
	color: ${({ theme, open }) => theme.palette[open ? 'white' : 'primaryMain']} !important;
	background-color: ${({ theme, open, danger }) =>
		theme.palette[danger ? 'red' : open ? 'primaryL1' : 'primaryL3']} !important;
	${({ focus, theme }) =>
		focus &&
		`
        &:focus{
            background-color: ${theme.palette.primary2} !important;
            color: ${theme.palette.white} !important;
        }
    `}
	& svg {
		transition: 0.3s ease;
		${({ active }) => active && `transform: rotate(180deg)`};
	}
	& path {
		fill: ${({ theme }) => theme.palette.primaryMain};
	}
`

const StyledTooltip = styled(Tooltip)`
	opacity: 1 !important;
	& .tooltip-inner {
		background-color: ${({ theme }) => theme.palette.bg} !important;
		color: ${({ theme }) => theme.palette.text} !important;
		min-width: 20rem;
		text-align: start;
		padding: 8px 16px;
	}
	& .tooltip-arrow {
		display: none;
	}
`

const StyledBody = styled(Accordion.Body)`
	background-color: transparent;
	margin-top: -1rem !important;
	pre {
		background-color: transparent;

		code {
			font-size: small;
		}
	}
`

export default function Methods({ openMethods, setOpenMethods }) {
	const { app, loading } = useSelector((store) => store.applications)

	const dispatch = useDispatch()

	const [paramValues, setParamValues] = useState([])
	const [results, setResults] = useState([])
	const [activeExamples, setActiveExamples] = useState([])
	const [openExamples, setOpenExamples] = useState([])
	const [openTooltip, setOpenTooltip] = useState(false)

	const [requestLoading, setRequestLoading] = useState(false)

	useEffect(() => {
		if (app?.methods?.length) {
			let data = []
			app.methods.forEach((item) => {
				data.push({
					method: item.name,
					arg: item.args.reduce((a, v) => ({ ...a, [v.name]: '' }), {}),
				})
			})
			setParamValues(data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const highlight = async () => {
			await Prism.highlightAll()
		}
		highlight()
	}, [results])

	const handleopenMethods = (e) => {
		const found = openMethods.find((i) => i === e)
		if (found) {
			const filtered = openMethods.filter((i) => i !== e)
			setOpenMethods(filtered)
		} else {
			setOpenMethods([...openMethods, e])
		}
	}

	const handleOnChangeMethodValue = (method, name, e) => {
		const newValues = [...paramValues]
		newValues.find((i) => i.method === method).arg[name] = e
		setParamValues(newValues)
	}

	const handleQueryMethod = async (method) => {
		const methodArgs = paramValues.find((i) => i.method === method).arg
		if (!Object.values(methodArgs).every((i) => i)) {
			toast.warn('Fill the inputs first')
			return
		}
		const filtered = results.filter((i) => i.method !== method)
		// if (app.name === 'Twaper') {
		// 	try {
		// 		setRequestLoading(true)
		// 		await handleRequest(app.name, method, methodArgs, filtered, setResults)
		// 		setRequestLoading(false)
		// 	} catch (err) {
		// 		setRequestLoading(false)
		// 	}
		// } else {
		try {
			let params = ''
			Object.entries(methodArgs).forEach((item) => {
				params = params.concat(`&params[${item[0]}]=${item[1]}`)
			})
			const res = await dispatch(methodQuery({ app: app.id, method, params }))
			if (res.payload?.success) {
				setResults([
					...filtered,
					{ method, res: JSON.stringify(res.payload.result, null, '\t') },
				])
				toast.success('Query Successful')
			} else {
				toast.warn(res.payload?.error?.message || 'Query Failed')
			}
		} catch (err) {
			console.error(err)
			toast.error('Something went wrong')
		}
		// }
	}

	const handleActiveExample = (method) => {
		const found = activeExamples.find((i) => i === method)
		if (found) {
			const filtered = activeExamples.filter((i) => i !== method)
			setActiveExamples(filtered)
			for (const name in paramValues.find((i) => i.method === method).arg) {
				handleOnChangeMethodValue(method, name, '')
			}
			handleOpenExample(null, method)
		} else {
			setActiveExamples([...activeExamples, method])
		}
	}

	const handleOpenExample = (e, method) => {
		const found = openExamples.find((i) => i.method === method)
		if (found) {
			const filtered = openExamples.filter((i) => i.method !== method)
			setOpenExamples(filtered)
			if (e) {
				Object.entries(e.args).forEach((i) => {
					handleOnChangeMethodValue(method, i[0], '')
				})
			}
		} else if (e) {
			setOpenExamples([...openExamples, { method, example: e.title }])
			Object.entries(e.args).forEach((i) => {
				handleOnChangeMethodValue(method, i[0], i[1])
			})
		}
	}

	const handleClear = (method) => {
		handleActiveExample(method)
		setOpenTooltip(false)
		const found = results.find((i) => i.method === method)
		if (found) {
			const filtered = results.filter((i) => i.method !== method)
			setResults(filtered)
		}
	}

	return (
		<StyledAccordion activeKey={openMethods} onSelect={handleopenMethods}>
			{app?.methods.length ? (
				app?.methods.map((item, index) => (
					<StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
						<Accordion.Header>{item.name}</Accordion.Header>
						<Accordion.Body className='d-flex flex-column'>
							{item.args.map((item2, index2) => (
								<div key={index2} className='d-flex flex-column mb-1'>
									<div className='position-relative mb-3 mt-5 mt-md-0'>
										<StyledInput
											className='form-control border-0 pe-md-5 rounded-pill'
											placeholder={
												item2.type === 'address'
													? '0x00000000000000000000000000000000'
													: ''
											}
											type={item2.type === 'int' ? 'number' : 'text'}
											value={
												paramValues.find((i) => i.method === item.name)?.arg[item2.name]
											}
											onChange={(e) =>
												handleOnChangeMethodValue(item.name, item2.name, e.target.value)
											}
										/>
										<StyledLabel className='small h-100 d-flex align-items-center justify-content-center'>
											<span className='me-1'>{item2.name}</span>
											<span>({item2.type})</span>
										</StyledLabel>
									</div>
								</div>
							))}
							{results.find((i) => i.method === item.name)?.res && (
								<StyledBody className='m-0 p-0 language-json'>
									<pre className='m-0 p-0'>
										<code>{results.find((i) => i.method === item.name)?.res}</code>
									</pre>
								</StyledBody>
							)}
							<div className='d-flex flex-column flex-md-row justify-content-between'>
								<div className='d-flex flex-column flex-md-row mb-3 mb-md-0'>
									{item.examples ? (
										<>
											<StyledButton2
												className='btn rounded-3 border-0 pe-1'
												onClick={() => handleActiveExample(item.name)}
												active={Boolean(activeExamples.find((i) => i === item.name))}
											>
												Set example
												<Icon icon='prime:chevron-right' width={26} />
											</StyledButton2>
											<Fade
												in={Boolean(activeExamples.find((i) => i === item.name))}
												unmountOnExit
											>
												<div className='d-flex flex-column flex-md-row mt-3 mt-md-0'>
													{item.examples.map((item3, index3) => (
														<Fade
															in={
																Boolean(
																	openExamples.find((i) => i.method === item.name)
																)
																	? !Boolean(
																			openExamples.find(
																				(i) => i.example === item3.name
																			)
																	  )
																		? true
																		: false
																	: true
															}
															key={index3}
															unmountOnExit
														>
															<div className='d-flex flex-column flex-md-row mb-3 mb-md-0'>
																<StyledButton2
																	className='btn rounded-3 border-0 ms-md-3'
																	onClick={() =>
																		handleOpenExample(item3, item.name)
																	}
																	open={Boolean(
																		openExamples.find(
																			(i) => i.example === item3.title
																		)
																	)}
																>
																	{item3.title}
																</StyledButton2>
																<Fade
																	in={Boolean(
																		openExamples.find(
																			(i) => i.example === item3.title
																		)
																	)}
																	unmountOnExit
																>
																	<div className='d-flex mt-3 mt-md-0'>
																		<OverlayTrigger
																			placement='top'
																			trigger='click'
																			show={openTooltip}
																			onToggle={setOpenTooltip}
																			overlay={
																				<StyledTooltip>
																					{item3.desc}
																				</StyledTooltip>
																			}
																		>
																			<StyledButton2
																				className='btn rounded-3 border-0 ms-md-3'
																				open={openTooltip}
																				key={index3}
																			>
																				Details
																			</StyledButton2>
																		</OverlayTrigger>
																		<StyledButton2
																			className='btn rounded-3 border-0 ms-3'
																			onClick={() => handleClear(item.name)}
																			open={true}
																			danger
																			key={index3}
																		>
																			Clear
																		</StyledButton2>
																	</div>
																</Fade>
															</div>
														</Fade>
													))}
												</div>
											</Fade>
										</>
									) : null}
								</div>
								<StyledButton
									className='btn rounded-pill fw-bold'
									onClick={() => handleQueryMethod(item.name)}
									disabled={loading}
								>
									{loading || requestLoading ? (
										<Icon icon='eos-icons:loading' width={21} />
									) : (
										'Query'
									)}
								</StyledButton>
							</div>
						</Accordion.Body>
					</StyledItem>
				))
			) : (
				<div className='text-center p-3'>
					<span className='small'>No methods found</span>
				</div>
			)}
		</StyledAccordion>
	)
}
