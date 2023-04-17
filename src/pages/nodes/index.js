import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';
// import useInterval from 'src/hooks/useInterval';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Searchbar from 'src/components/Searchbar';

import { useDispatch, useSelector } from 'react-redux';
import { getAllNodes } from 'src/redux/NodesSlice';

export default function Nodes() {

    const { nodes, loading, totalNodes } = useSelector(store => store.nodes)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getAllNodes({ page: page + 1, q: inputValue }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    // useInterval({
    //     deps: [inputValue, page],
    //     delay: 5000,
    //     func: () => getAllNodes({ page: page + 1, q: inputValue })
    // })

    useSearch({
        inputValue,
        delay: 1500,
        searchFunc: () => getAllNodes({ page: 1, q: inputValue }),
        callback: () => getAllNodes({ page: 1 })
    })

    return (
        <MainLayout title='Nodes'>

            <section className='mb-4'>
                <Card
                    title='Nodes on Muon'
                    action='search'
                    actionContent={
                        <Searchbar
                            value={inputValue}
                            setValue={setInputValue}
                            placeholder='Node Address'
                        />
                    }
                    footerContent={
                        <Pagination
                            LIMIT={LIMIT}
                            dataLength={nodes.length}
                            inputValue={inputValue}
                            page={page}
                            setPage={setPage}
                            loading={loading}
                            total={totalNodes}
                        />
                    }
                >
                    <Table head={['Node ID', 'Node Address', 'Status', 'Start Time', 'Last Edit Time']}>
                        {!nodes.length ?
                            <tr>
                                <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                            </tr>
                            :
                            nodes.slice(0, 10).map((item, index) => (
                                <tr key={index}>
                                    <td className='small'>{item.id}</td>
                                    <td className='small pe-md-4'>{item.nodeAddress.slice(0, 10) + '...' + item.nodeAddress.slice(-10)}</td>
                                    <td className='small pe-md-4'>{item.active ? 'Active' : 'Paused'}</td>
                                    <td className='small'>{new Date(item.startTime)?.toLocaleString()}</td>
                                    <td className='small text-end'>{new Date(item.lastEditTime)?.toLocaleString()}</td>
                                </tr>
                            ))}
                    </Table>
                </Card>
            </section>

        </MainLayout>
    )
}
