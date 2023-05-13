import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import styled from 'styled-components';
import { fromNow, fullFormat } from 'src/utils/times';

import Accordion from 'react-bootstrap/Accordion';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Copy from 'src/components/Copy';

import { wrapper } from 'src/redux/store';
import { getSingleRequest } from 'src/redux/RequestsSlice';
import { useSelector } from 'react-redux';

const StyledSpan = styled.span`
    color: ${({ theme }) => theme.palette.gray5};
`

const StyledAccordion = styled(Accordion)`
    & .accordion-button {
      border-radius: 1rem !important;
      color: ${({ theme }) => theme.palette.primary1};
      background-color: transparent !important;
      box-shadow: none;

      &:after {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2368687f'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
      }
      &:focus {
        box-shadow: none;
      }
    }
    & .accordion-item{
        border: 1px dashed ${({ theme }) => theme.palette.gray5} !important;
        background-color: transparent !important;
    }
    & .accordion-body{
        border-radius: 1rem !important;
    }

    & path{
        fill: ${({ theme }) => theme.palette.primary1} !important;
    }
`

const StyledDiv = styled.div`
    border: 1px dashed ${({ theme }) => theme.palette.gray5} !important;
    & h6{
      color: ${({ theme }) => theme.palette.primary1};
    }
`

const StyledSpan2 = styled.span`
    white-space: pre-wrap;
`

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    const res = await store.dispatch(getSingleRequest(query.id))
    if (res.payload?.status !== 200) {
        return {
            notFound: true
        }
    }
    return {
        props: {}
    }
})

export default function ApplicationPage() {

    const { request } = useSelector(store => store.requests)

    const [openAccordions, setOpenAccordions] = useState([])

    const [start, setStart] = useState(null)
    const [confirm, setConfirm] = useState(null)

    useEffect(() => {
        setStart(fullFormat(request?.startedAt))
        setConfirm(fullFormat(request?.confirmedAt))
    }, [request])

    const handleOpen = (e) => {
        const found = openAccordions.find(i => i === e)
        if (found) {
            const filtered = openAccordions.filter(i => i !== e)
            setOpenAccordions(filtered)
        }
        else {
            setOpenAccordions([...openAccordions, e])
        }
    }

    return (
        <MainLayout title={`Request ${request?.reqId}`}>

            <section className='mb-4 position-relative overflow-hidden'>
                <Card color='gradient2'>
                    <div className='row g-4 justify-content-center pb-3 px-xl-5 px-0'>
                        <div className='col-lg-9 col-12 d-flex align-items-center'>
                            <StyledSpan className='small'>Request ID</StyledSpan>
                            <h6 className='fw-bold small mb-0 mx-2'>{request?.reqId}</h6>
                            <Copy text={request?.reqId} />
                        </div>
                        <div className='col-lg-3 col-12 d-flex align-items-center justify-content-lg-end'>
                            <StyledSpan className='small'>Application/Method:</StyledSpan>
                            <h6 className='fw-bold small mb-0 mx-2'>
                                <Link href={`/applications/${request?.app}`}>
                                    {request?.app}
                                </Link>
                                .{request?.method}
                            </h6>
                        </div>
                        <div className='col-lg-6 col-12 d-flex flex-wrap align-items-center'>
                            <StyledSpan className='small'>Initial Request Time:</StyledSpan>
                            <h6 className='fw-bold small mb-0 ms-2'>{fromNow(request?.startedAt)} ({start})</h6>
                        </div>
                        <div className='col-lg-6 col-12 d-flex flex-wrap align-items-center justify-content-lg-end'>
                            <StyledSpan className='small'>Confirmed at:</StyledSpan>
                            <h6 className='fw-bold small mb-0 ms-2'>{fromNow(request?.confirmedAt)} ({confirm})</h6>
                        </div>
                    </div>
                </Card>
            </section>

            <section className='mb-4'>
                <Card>
                    <div className='d-flex flex-column'>
                        <StyledDiv className='mb-3 rounded-4 p-3 d-flex flex-column'>
                            <h6 className='mb-4'>Signature</h6>
                            <div className='d-flex flex-column px-3'>
                                <p className='small mb-1'>Signature:
                                    <span className='ms-4'>{request?.signatures[0]?.signature}</span>
                                </p>
                                <p className='small mb-1'>Owner address:
                                    <span className='ms-4'>{request?.signatures[0]?.owner}</span>
                                </p>
                                <div className='small mb-1'>Owner public key:
                                    {request?.signatures[0] ?
                                        <StyledSpan2 className='ms-4'>{JSON.stringify(request?.signatures[0].ownerPubKey, null, 5)}</StyledSpan2>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                        </StyledDiv>
                        <StyledAccordion activeKey={openAccordions} onSelect={handleOpen}>
                            <Accordion.Item eventKey="0" className='mb-3 rounded-4'>
                                <Accordion.Header>Params</Accordion.Header>
                                <Accordion.Body className='pt-0'>
                                    {request?.data.params ?
                                        <div className='d-flex flex-column px-3'>
                                            <StyledSpan2 className='small'>
                                                {JSON.stringify(request.data.params, null, 5)}
                                            </StyledSpan2>
                                        </div>
                                        :
                                        <span>No Params</span>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className='mb-3 rounded-4'>
                                <Accordion.Header>Signature params</Accordion.Header>
                                <Accordion.Body className='pt-0'>
                                    <Table
                                        head={['Name', 'Type', 'Value']}
                                        noLast
                                    >
                                        {request?.data.signParams?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='small'>{item.name || '---'}</td>
                                                <td className='small'>{item.type}</td>
                                                <td className='small'>{item.value}</td>
                                            </tr>
                                        ))}
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className='mb-3 rounded-4'>
                                <Accordion.Header>Result</Accordion.Header>
                                <Accordion.Body className='pt-0'>
                                    {request?.data.result ?
                                        typeof request.data.result === 'object' ?
                                            <div className='d-flex flex-column px-3'>
                                                <StyledSpan2 className='small'>
                                                    {JSON.stringify(request.data.result, null, 5)}
                                                </StyledSpan2>
                                            </div>
                                            :
                                            <span className='px-3'>{String(request?.data.result)}</span>
                                        :
                                        null
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </StyledAccordion>
                    </div>
                </Card>
            </section>

        </MainLayout>
    )
}