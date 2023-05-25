import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

import Accordion from 'react-bootstrap/Accordion';
import Fade from 'react-bootstrap/Fade';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux';
import { methodQuery } from 'src/redux/ApplicationsSlice';

const StyledAccordion = styled(Accordion)`
    & .accordion-button {
      border-radius: 1rem !important;
      color: ${({ theme }) => theme.palette.gray2};
      background-color: transparent;
      box-shadow: none;

      &:after {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2368687f'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
      }
      &:focus {
        box-shadow: none;
      }
    }
`

const StyledItem = styled(Accordion.Item)`
    background-color: transparent;
    border: 1px dashed ${({ theme }) => theme.palette.gray1} !important;
`

const StyledLabel = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 50rem 50rem 0;
    text-transform: capitalize;
    width: 8.8rem;
    color: ${({ theme }) => theme.palette.gray2};
    background-color: ${({ theme }) => theme.palette.gray7};
    ${({ theme }) => theme.breakpoints.sm`
        top: -50px;
        right: unset;
        left: 0;
        border-radius: 5rem;
    `}
`

const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.palette.white};
    height: 42px;
`

const StyledButton = styled.button`
    height: 42px;
    width: 8.8rem;
    font-size: small;
    letter-spacing: 0.6px;
    color: ${({ theme }) => theme.palette.white} !important;
    background-color: ${({ theme }) => theme.palette.primary1} !important;
    & path{
        fill:${({ theme }) => theme.palette.white};
    }
`

const StyledButton2 = styled.button`
    height: 42px;
    letter-spacing: 0.6px;
    font-size: small;
    color: ${({ theme, open }) => theme.palette[open ? 'white' : 'gray1']} !important;
    background-color: ${({ theme, open, danger }) => theme.palette[danger ? 'red' : open ? 'primary2' : 'white']} !important;
    ${({ focus, theme }) => focus && `
        &:focus{
            background-color: ${theme.palette.primary2} !important;
            color: ${theme.palette.white} !important;
        }
    `}
    & svg{
        transition: .3s ease;
        ${({ active }) => active && `
            transform: rotate(180deg)
        `};
    }
    & path{
        fill:${({ theme }) => theme.palette.gray1};
    }
`

const StyledTooltip = styled(Tooltip)`
    opacity: 1 !important;
    & .tooltip-inner{
        background-color: ${({ theme }) => theme.palette.white} !important;
        color: ${({ theme }) => theme.palette.gray1} !important;
        min-width: 20rem;
        text-align: start;
        padding: 8px 16px;
    }
    & .tooltip-arrow{
        display: none;
    }
`

export default function Methods({ openMethods, setOpenMethods }) {

    const { app, loading } = useSelector(store => store.applications)

    const dispatch = useDispatch()

    const [paramValues, setParamValues] = useState([])
    const [results, setResults] = useState([])
    const [activeExamples, setActiveExamples] = useState([])
    const [openExamples, setOpenExamples] = useState([])
    const [openTooltip, setOpenTooltip] = useState(false)

    useEffect(() => {
        if (app?.methods?.length) {
            let data = []
            app.methods.forEach(item => {
                data.push({
                    method: item.name,
                    arg: item.args.reduce((a, v) => ({ ...a, [v.name]: '' }), {})
                })
            })
            setParamValues(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleopenMethods = (e) => {
        const found = openMethods.find(i => i === e)
        if (found) {
            const filtered = openMethods.filter(i => i !== e)
            setOpenMethods(filtered)
        }
        else {
            setOpenMethods([...openMethods, e])
        }
    }

    const handleOnChangeMethodValue = (method, name, e) => {
        const newValues = [...paramValues]
        newValues.find(i => i.method === method).arg[name] = e
        setParamValues(newValues)
    }

    const handleQueryMethod = async (method) => {
        try {
            let params = ''
            const methodArgs = paramValues.find(i => i.method === method).arg
            Object.entries(methodArgs).forEach(item => {
                params = params.concat(`&params[${item[0]}]=${item[1]}`)
            })
            const values = { app: app.id, method, params }
            const res = await dispatch(methodQuery(values))
            if (res.payload?.success) {
                setResults([...results, { method, res: JSON.stringify(res.payload.result, null, '\t') }])
                toast.success('Query Successful')
            }
            else {
                toast.warn(res.payload?.error?.message || 'Query Failed')
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    }

    const handleActiveExample = (e) => {
        const found = activeExamples.find(i => i === e)
        if (found) {
            const filtered = activeExamples.filter(i => i !== e)
            setActiveExamples(filtered)
            for (const name in paramValues.find(i => i.method === e).arg) {
                handleOnChangeMethodValue(e, name, '')
            }
            handleOpenExample(null, e)
        }
        else {
            setActiveExamples([...activeExamples, e])
        }
    }

    const handleOpenExample = (e, method) => {
        const found = openExamples.find(i => i.method === method)
        if (found) {
            const filtered = openExamples.filter(i => i.method !== method)
            setOpenExamples(filtered)
            if (e) {
                Object.entries(e.args).forEach(i => {
                    handleOnChangeMethodValue(method, i[0], '')
                })
            }
        }
        else if (e) {
            setOpenExamples([...openExamples, { method, example: e.title }])
            Object.entries(e.args).forEach(i => {
                handleOnChangeMethodValue(method, i[0], i[1])
            })
        }
    }

    const handleClear = (e) => {
        handleActiveExample(e)
        setOpenTooltip(false)
    }

    return (
        <StyledAccordion
            activeKey={openMethods}
            onSelect={handleopenMethods}
        >
            {app?.methods.length ?
                app?.methods.map((item, index) => (
                    <StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
                        <Accordion.Header>{item.name}</Accordion.Header>
                        <Accordion.Body className='d-flex flex-column'>
                            {item.args.map((item2, index2) => (
                                <div key={index2} className='d-flex flex-column mb-1'>
                                    <div className='position-relative mb-3 mt-5 mt-md-0'>
                                        <StyledInput
                                            className='form-control border-0 pe-md-5 rounded-pill'
                                            placeholder={item2.type === 'address' ? '0x00000000000000000000000000000000' : ''}
                                            type={item2.type === 'int' ? 'number' : 'text'}
                                            value={paramValues.find(i => i.method === item.name)?.arg[item2.name]}
                                            onChange={(e) => handleOnChangeMethodValue(item.name, item2.name, e.target.value)}
                                        />
                                        <StyledLabel className='small h-100 d-flex align-items-center justify-content-center'>
                                            <span>{item2.name}</span>
                                        </StyledLabel>
                                    </div>
                                </div>
                            ))}
                            {results.find(i => i.method === item.name)?.res &&
                                <p>{results.find(i => i.method === item.name)?.res}</p>
                            }
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    {item.examples ?
                                        <>
                                            <StyledButton2
                                                className='btn rounded-3 border-0 pe-1'
                                                onClick={() => handleActiveExample(item.name)}
                                                active={Boolean(activeExamples.find(i => i === item.name))}
                                            >
                                                Set example
                                                <Icon icon="prime:chevron-right" width={26} />
                                            </StyledButton2>
                                            <Fade in={Boolean(activeExamples.find(i => i === item.name))} unmountOnExit>
                                                <div className='d-flex'>
                                                    {item.examples.map((item3, index3) => (
                                                        <Fade
                                                            in={
                                                                Boolean(openExamples.find(i => i.method === item.name)) ?
                                                                    !Boolean(openExamples.find(i => i.example === item3.name)) ?
                                                                        true : false
                                                                    : true
                                                            }
                                                            key={index3}
                                                            unmountOnExit
                                                        >
                                                            <div className='d-flex'>
                                                                <StyledButton2
                                                                    className='btn rounded-3 border-0 ms-3'
                                                                    onClick={() => handleOpenExample(item3, item.name)}
                                                                    open={Boolean(openExamples.find(i => i.example === item3.title))}
                                                                >
                                                                    {item3.title}
                                                                </StyledButton2>
                                                                <Fade in={Boolean(openExamples.find(i => i.example === item3.title))} unmountOnExit>
                                                                    <div className='d-flex'>
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
                                                                                className='btn rounded-3 border-0 ms-3'
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
                                        :
                                        null
                                    }
                                </div>
                                <StyledButton
                                    className='btn rounded-pill fw-bold'
                                    onClick={() => handleQueryMethod(item.name)}
                                    disabled={loading}
                                >
                                    {loading ?
                                        <Icon icon="eos-icons:loading" width="21" />
                                        :
                                        'Query'
                                    }
                                </StyledButton>
                            </div>
                        </Accordion.Body>
                    </StyledItem>
                ))
                :
                <div className='text-center p-3'>
                    <span className='small'>No methods found</span>
                </div>
            }
        </StyledAccordion>
    )
}