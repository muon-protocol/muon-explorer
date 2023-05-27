import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { dateFormat } from 'src/utils/times';

import { LIMIT } from 'src/constants/applications';

import useSearch from 'src/hooks/useSearch';

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Pagination from 'src/components/Pagination';
import Searchbar from 'src/components/Searchbar';

import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from 'src/redux/ApplicationsSlice';

export default function Applications() {

    const { applications, loading, totalApps } = useSelector(store => store.applications)

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(getApplications({ page: page + 1, search: inputValue }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    useSearch({
        inputValue,
        delay: 1500,
        searchFunc: () => {
            if (page === 0) {
                dispatch(getApplications({ page: page + 1, search: inputValue }))
            }
            else {
                setPage(0)
            }
        }
    })

    return (
        <MainLayout title='Applications'>

            <section className='mb-4'>
                <Card
                    title='Applications on Muon'
                    action='search'
                    actionContent={
                        <Searchbar
                            value={inputValue}
                            setValue={setInputValue}
                            placeholder='App Name'
                        />
                    }
                    footerContent={
                        <Pagination
                            LIMIT={LIMIT}
                            dataLength={applications.length}
                            inputValue={inputValue}
                            page={page}
                            setPage={setPage}
                            loading={loading}
                            total={totalApps}
                        />
                    }
                >
                    <Table
                        head={['App Name', 'Most Used Method', '#Methods',
                            'Nodes on app', 'Confirmed Requests']}
                    >
                        {!applications.length ?
                            <tr>
                                <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                            </tr>
                            :
                            applications.map((item, index) => (
                                <tr key={index}>
                                    <td className='small'>
                                        <Link href={`/applications/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className='small'>{item.mostUsedMethod}</td>
                                    <td className='small'>{item.methods.length || 0}</td>
                                    <td className='small'>{item.data?.context.tss.threshold.max}</td>
                                    <td className='small text-end'>{item.confirmed_requests}</td>
                                </tr>
                            ))
                        }
                    </Table>
                </Card>
            </section>

        </MainLayout>
    )
}
