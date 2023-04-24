import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { dateTimeFormat } from 'src/utils/times';
import styled from 'styled-components';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Searchbar from 'src/components/Searchbar';

import { useDispatch, useSelector } from 'react-redux';
import { getAllNodes } from 'src/redux/NodesSlice';

const StyledLink = styled(Link)`
    color: ${({theme}) => theme.palette.primary1};
`

export default function Nodes() {

    const { nodes, loading, totalNodes } = useSelector(store => store.nodes)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getAllNodes({ page: page + 1, q: inputValue }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    useSearch({
        inputValue,
        delay: 1500,
        searchFunc: () => {
            if (page === 0) {
                dispatch(getAllNodes({ page: page + 1, q: inputValue }))
            }
            else {
                setPage(0)
            }
        }
    })

    return (
        <MainLayout title='Nodes'>

            <section className='mb-4'>
                <Card
                    title='Muon Nodes'
                    action='search'
                    actionContent={
                        <Searchbar
                            value={inputValue}
                            setValue={setInputValue}
                            placeholder='Node ID'
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
                    <Table head={['Node ID', 'Status', 'Tier', 'Start Time', '']}>
                        {!nodes.length ?
                            <tr>
                                <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                            </tr>
                            :
                            nodes.map((item, index) => (
                                <tr key={index}>
                                    <td className='small'>{item.id}</td>
                                    <td className='small pe-md-4'>{item.active ? 'Active' : 'Paused'}</td>
                                    <td className='small pe-md-4'>Tie-1 (Starter)</td>
                                    <td className='small pe-md-4'>{dateTimeFormat(item.startTime)}</td>
                                    <td className='small text-end'>
                                        <StyledLink href={`/nodes/${item.id}`} className='text-decoration-underline'>
                                            View details
                                        </StyledLink>
                                    </td>
                                </tr>
                            ))}
                    </Table>
                </Card>
            </section>

        </MainLayout>
    )
}
