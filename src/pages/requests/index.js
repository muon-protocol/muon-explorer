import React, { useState, useEffect } from 'react'
import { dateTimeFormat } from 'src/utils/times';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';
import useInterval from 'src/hooks/useInterval';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import ChartPills from 'src/sections/Landing/ChartPills';
import LineChart from 'src/components/Chart/LineChart';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Searchbar from 'src/components/Searchbar';

import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from 'src/redux/RequestsSlice';

export default function Requests() {

    const { requests, requestsLoading, totalReqs, requestsHistory, historyLoading } = useSelector(store => store.requests)

    const dispatch = useDispatch()

    const [length, setLength] = useState(1)

    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getRequests({ page: page + 1, search: inputValue }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    useInterval({
        deps: [inputValue, page],
        delay: 5000,
        func: () => getRequests({ page: page + 1, search: inputValue })
    })

    useSearch({
        inputValue,
        delay: 1500,
        searchFunc: () => getRequests({ page: 1, search: inputValue }),
        callback: () => getRequests({ page: 1 })
    })

    return (
        <MainLayout title='Requests'>

            <section className='mb-4'>
                <Card
                    Header='h5'
                    title='Muon Requests History'
                    action='pills'
                    actionContent={<ChartPills color='gray7' active={length} setActive={setLength} />}
                >
                    <LineChart data={historyLoading ? [] : requestsHistory} length={length} />
                </Card>
            </section>

            <section className='mb-4'>
                <Card
                    title='Muon Requests'
                    action='search'
                    actionContent={
                        <Searchbar
                            value={inputValue}
                            setValue={setInputValue}
                            placeholder='Req Address / Gateway Address'
                        />
                    }
                    footerContent={
                        <Pagination
                            page={page}
                            setPage={setPage}
                            loading={requestsLoading}
                            LIMIT={LIMIT}
                            dataLength={requests.length}
                            inputValue={inputValue}
                            total={totalReqs}
                        />
                    }
                >
                    <Table
                        head={['Req Address', 'Target App', 'Method', 'Gateway Address',
                            '#Signatures', 'Start Time', 'Confirm Time']}
                    >
                        {!requests.length ?
                            <tr>
                                <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                            </tr>
                            :
                            requests.map((item, index) => (
                                <tr key={index}>
                                    <td className='small'>{item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}</td>
                                    <td className='small'>{item.app}</td>
                                    <td className='small'>{item.method}</td>
                                    <td className='small'>{item.gwAddress.slice(0, 10) + '...' + item.gwAddress.slice(-10)}</td>
                                    <td className='small'>{item.signatures.length || 0}</td>
                                    <td className='small'>{dateTimeFormat(item.startedAt)}</td>
                                    <td className='small text-end'>{dateTimeFormat(item?.confirmedAt)}</td>
                                </tr>
                            ))
                        }
                    </Table>
                </Card>
            </section>

        </MainLayout>
    )
}
