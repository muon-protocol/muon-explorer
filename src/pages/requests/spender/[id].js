import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dateTimeFormat } from 'src/utils/times';

import { LIMIT } from 'src/constants/applications';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { getSpenderRequests } from 'src/redux/RequestsSlice';

export default function SpenderRequests() {

    const { spenderRequests, requestsLoading, totalReqs } = useSelector(store => store.requests)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)

    const { query } = useRouter()

    useEffect(() => {
        if (query.id) {
            dispatch(getSpenderRequests({ page: page + 1, search: query.id }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page, query])

    return (
        <MainLayout title='Spender Requests'>

            <section className='mb-4'>
                <Card
                    title='Spender Requests'
                    action='search'
                    footerContent={
                        <Pagination
                            page={page}
                            setPage={setPage}
                            loading={requestsLoading}
                            LIMIT={LIMIT}
                            dataLength={spenderRequests.length}
                            total={totalReqs}
                        />
                    }
                >
                    <Table head={['Req ID', 'From', 'Target App', 'Method', 'Gateway Address', 'Start Time', 'Confirm Time']}>
                        {!spenderRequests.length ?
                            <tr>
                                <td className='small text-center fw-bold pt-4' colSpan={7}>No request found for this spender</td>
                            </tr>
                            :
                            spenderRequests.map((item, index) => (
                                <tr key={index}>
                                    <td className='small'>
                                        <Link href={`/requests/${item.reqId}`}>
                                            {item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}
                                        </Link>
                                    </td>
                                    <td className='small'>
                                        {item.data?.fee?.spender?.address ?
                                            <Link href={`/requests/spender/${item.data?.fee?.spender?.address}`}>
                                                {item.data?.fee?.spender?.address.slice(0, 10) + '...' + item.data?.fee?.spender?.address.slice(-10)}
                                            </Link>
                                            :
                                            ''
                                        }
                                    </td>
                                    <td className='small'>
                                        <Link href={`/applications/${item.app}`}>
                                            {item.app}
                                        </Link>
                                    </td>
                                    <td className='small'>{item.method}</td>
                                    <td className='small'>
                                        <Link href={`/nodes/${item.gwAddress}`}>
                                            {item.gwAddress.slice(0, 10) + '...' + item.gwAddress.slice(-10)}
                                        </Link>
                                    </td>
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
