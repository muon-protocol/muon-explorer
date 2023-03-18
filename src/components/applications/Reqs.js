import React, { useState, useEffect } from 'react'

import { Icon } from '@iconify/react'

import { useDispatch, useSelector } from 'react-redux';
import { getRequests } from 'src/redux/DataSlice';

const LIMIT = 10
const MAX = 20

export default function Reqs() {

    const { requests, requestsLoading } = useSelector(store => store.data)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        dispatch(getRequests({ page })).then(res => {
            setFilteredData(res.payload || [])
        })
    }, [dispatch, page])

    const handleSearch = (e) => {
        setInputValue(e)
        if (e) {
            const addressSearch = requests.filter(i => String(i.address).match(e))
            const gatewaySearch = requests.filter(i => String(i.gateway).match(e))
            const filtered = addressSearch.length ? addressSearch : gatewaySearch
            setFilteredData(filtered)
        }
        else {
            setFilteredData(requests)
        }
    }

    const handlePrevPage = () => {
        if (page !== 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        // if (page !== Math.floor(data.length / LIMIT)) {
        //     setPage(page + 1)
        // }
        if (filteredData.length) {
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
                        placeholder='Req Address / Target App / Method Name / ...'
                        className='form-control bg-transparent border-0 ms-1 py-1'
                        value={inputValue}
                        onChange={e => handleSearch(e.target.value)}
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
                            {requestsLoading ?
                                <tr>
                                    <td className='small text-center fw-bold pt-4' colSpan={7}>Loading ...</td>
                                </tr>
                                :
                                !filteredData.length ?
                                    <tr>
                                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                                    </tr>
                                    :
                                    filteredData.map((item, index) => (
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
                        {(LIMIT * page + 1)}-{filteredData.length + (page * LIMIT)} / {inputValue ? filteredData.length : MAX}
                    </span>

                    <div className='d-flex align-items-center'>
                        <button
                            className='btn border-0 p-0'
                            onClick={handlePrevPage}
                            disabled={page === 0}
                        >
                            <Icon
                                icon="material-symbols:arrow-left-rounded"
                                width={50}
                                color={page === 0 ? '#cfd1f9' : '#a5a9f8'}
                            />
                        </button>
                        <span className='text-primary small'>{page + 1} / {Math.ceil((inputValue ? filteredData.length : MAX) / LIMIT)}</span>
                        <button
                            className='btn border-0 p-0'
                            onClick={handleNextPage}
                            disabled={page + 1 === Math.ceil((inputValue ? filteredData.length : MAX) / LIMIT)}
                        >
                            <Icon
                                icon="material-symbols:arrow-right-rounded"
                                width={50}
                                color={page + 1 === Math.ceil((inputValue ? filteredData.length : MAX) / LIMIT) ? '#cfd1f9' : '#a5a9f8'}
                            />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
