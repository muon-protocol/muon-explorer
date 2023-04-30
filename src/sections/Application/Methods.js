import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux';
import { methodQuery } from 'src/redux/ApplicationsSlice';

const StyledAccordion = styled(Accordion)`
    & .accordion-button {
      border-radius: 1rem !important;
      color: ${({ theme }) => theme.palette.gray2};
      background-color: ${({ theme }) => theme.palette.gray8};
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
    background-color: ${({ theme }) => theme.palette.gray9};
`

const StyledBody = styled(Accordion.Body)`
    background-color: ${({ theme }) => theme.palette.gray9};
`

const StyledLabel = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 50rem 50rem 0;
    width: 7rem;
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
    background-color: ${({ theme }) => theme.palette.gray8};
`

const StyledButton = styled.button`
    font-size: small;
    letter-spacing: 0.6px;
    color: ${({ theme }) => theme.palette.white} !important;
    background-color: ${({ theme }) => theme.palette.primary1} !important;
    & path{
        fill:${({ theme }) => theme.palette.white};
    }
`

export default function Methods({ openMethods, setOpenMethods }) {

    const { app, loading } = useSelector(store => store.applications)

    const dispatch = useDispatch()

    const [paramValues, setParamValues] = useState([])
    const [results, setResults] = useState([])

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

    const handleMethod = (e) => {
        const found = openMethods.find(i => i === e)
        if (found) {
            const filtered = openMethods.filter(i => i !== e)
            setOpenMethods(filtered)
        }
        else {
            setOpenMethods([...openMethods, e])
        }
    }

    const handleOnChange = (e, method, name) => {
        const newValues = [...paramValues]
        newValues.find(i => i.method === method).arg[name] = e
        setParamValues(newValues)
    }

    const handleQuery = async (method) => {
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

    return (
        <StyledAccordion
            activeKey={openMethods}
            onSelect={handleMethod}
        >
            {app?.methods.length ?
                app?.methods.map((item, index) => (
                    <StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
                        <Accordion.Header>{item.name}</Accordion.Header>
                        <StyledBody>
                            {item.args.map((item2, index2) => (
                                <div key={index2} className='d-flex flex-column mb-1'>
                                    <div className='position-relative mb-3 mt-5 mt-md-0'>
                                        <StyledInput
                                            className='form-control border-0 pe-md-5 rounded-pill'
                                            placeholder={item2.type === 'address' ? '0x00000000000000000000000000000000' : ''}
                                            type={item2.type === 'int' ? 'number' : 'text'}
                                            value={paramValues.find(i => i.method === item.name)?.arg[item2.name]}
                                            onChange={(e) => handleOnChange(e.target.value, item.name, item2.name)}
                                        />
                                        <StyledLabel className='small h-100 px-3 d-flex align-items-center justify-content-center'>
                                            <span>{item2.name}</span>
                                        </StyledLabel>
                                    </div>
                                </div>
                            ))}
                            {results.find(i => i.method === item.name)?.res &&
                                <p>{results.find(i => i.method === item.name)?.res}</p>
                            }
                            <StyledButton
                                className='btn px-5 py-1 rounded-pill align-self-start fw-bold'
                                onClick={() => handleQuery(item.name)}
                                disabled={loading}
                            >
                                {loading ?
                                    <Icon icon="eos-icons:loading" width="21" />
                                    :
                                    'Query'
                                }
                            </StyledButton>
                        </StyledBody>
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