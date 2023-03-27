import React, { useState, useEffect } from 'react'

import { Icon } from '@iconify/react'

import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from 'src/redux/DataSlice';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';
import useInterval from 'src/hooks/useInterval';

export default function RequestsTab() {

    const { requests, requestsLoading, totalReq } = useSelector(store => store.data)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getRequests({ page: page + 1, q: inputValue }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    useInterval({
        deps: [inputValue, page],
        delay: 5000,
        func: () => getRequests({ page: page + 1, q: inputValue })
    })

    useSearch({
        inputValue,
        delay: 1500,
        searchFunc: () => getRequests({ page: 1, q: inputValue }),
        callback: () => getRequests({ page: 1 })
    })

    const handlePrevPage = () => {
        if (page !== 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (requests.length) {
            setPage(page + 1)
        }
    }

    return (
        <div className='card border-0 rounded-4 mt-3 mx-1 mx-md-3 mb-0 reqs'>

            <div className='card-header d-flex flex-wrap justify-content-between align-items-center bg-white border-0'>
                <h6 className='fw-bold text-gray2 mb-4 mb-md-0'>Latest Requests</h6>
                <div className='searchbar position-relative rounded-pill bg-gray10 py-1 pl-3 ps-4'>
                    <Icon icon="material-symbols:search" width={20} color='#88889a' />
                    <input
                        type='search'
                        placeholder='Req Address / Gateway Address'
                        className='form-control bg-transparent border-0 ms-1 py-1'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </div>
            </div>

            <div className='card-body bg-white'>
                <div className='table-responsive'>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Req Address</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Target App</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Method</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Gateway Address</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>#Signatures</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Star Time</th>
                                <th scope="col" className='smaller text-gray6 fw-normal'>Confirm Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!requests.length ?
                                <tr className='state-tr'>
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
                        </tbody>
                    </table>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <span className='text-primary-light small'>
                        {(LIMIT * page + 1)}-{requests.length + (page * LIMIT)} / {totalReq}
                    </span>

                    <div className='d-flex align-items-center'>
                        <button
                            className='btn border-0 p-0'
                            onClick={handlePrevPage}
                            disabled={page === 0 || requestsLoading}
                        >
                            <Icon
                                icon="material-symbols:arrow-left-rounded"
                                width={50}
                                color={page === 0 ? '#cfd1f9' : '#a5a9f8'}
                            />
                        </button>
                        <span className='text-primary small'>{inputValue ? '1' : page + 1} / {Math.ceil(totalReq / LIMIT)}</span>
                        <button
                            className='btn border-0 p-0'
                            onClick={handleNextPage}
                            disabled={page + 1 === Math.ceil(totalReq / LIMIT) || requestsLoading}
                        >
                            <Icon
                                icon="material-symbols:arrow-right-rounded"
                                width={50}
                                color={page + 1 === Math.ceil(totalReq / LIMIT) ? '#cfd1f9' : '#a5a9f8'}
                            />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
