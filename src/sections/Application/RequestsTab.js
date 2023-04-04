import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from 'src/redux/DataSlice';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';
import useInterval from 'src/hooks/useInterval';
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Searchbar from 'src/components/Searchbar';

export default function RequestsTab() {

    const { requests, requestsLoading, totalReq } = useSelector(store => store.data)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)

    const [inputValue, setInputValue] = useState('')

    // useEffect(() => {
    //     dispatch(getRequests({ page: page + 1, q: inputValue }))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, page])

    // useInterval({
    //     deps: [inputValue, page],
    //     delay: 5000,
    //     func: () => getRequests({ page: page + 1, q: inputValue })
    // })

    // useSearch({
    //     inputValue,
    //     delay: 1500,
    //     searchFunc: () => getRequests({ page: 1, q: inputValue }),
    //     callback: () => getRequests({ page: 1 })
    // })

    return (
        <Card
            title='Latest Requests'
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
                    LIMIT={LIMIT}
                    loading={requestsLoading}
                    dataLength={requests.length}
                    inputValue={inputValue}
                    total={totalReq}
                />
            }
        >
            <Table
                head={['Req Address', 'Target App', 'Method', 'Gateway Address', '#Signatures', 'Star Time', 'Confirm Time']}
            >
                {!requests.length ?
                    <tr>
                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                    </tr>
                    :
                    requests.map((item, index) => (
                        <tr key={index}>
                            <td className='small'>{item.address.slice(0, 10) + '...' + item.address.slice(-10)}</td>
                            <td className='small'>{item.app}</td>
                            <td className='small'>{item.method}</td>
                            <td className='small'>{item.gateway.slice(0, 10) + '...' + item.gateway.slice(-10)}</td>
                            <td className='small'>{item.sigs}</td>
                            <td className='small'>{new Date(item.start).toLocaleString()}</td>
                            <td className='small'>{new Date(item.confirm).toLocaleString()}</td>
                        </tr>
                    ))
                }
            </Table>

        </Card>
    )
}
