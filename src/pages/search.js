import React from 'react'
import Link from 'next/link';

import MainLayout from 'src/layouts/MainLayout'
import LandingSearchbar from 'src/sections/Landing/LandingSearchbar';
import Card from 'src/components/Card';
import Table from 'src/components/Table';

import { useSelector } from 'react-redux';
import { dateFormat, dateTimeFormat } from 'src/utils/times';

export default function Search() {

    const { searchedApps } = useSelector(store => store.applications)
    const { searchedReqs } = useSelector(store => store.requests)
    const { searchedNodes } = useSelector(store => store.nodes)

    return (
        <MainLayout title='Search' landing>

            <section className='mb-4'>
                <LandingSearchbar landing />
            </section>

            <section className='mb-4'>
                <Card>
                    {searchedApps.length ?
                        <div className='mb-4'>
                            <h6 className='fw-bold'>Applications Result :</h6>
                            <Table
                                head={['App Name', 'Most Used Method', '#Methods',
                                    'Nodes on app', 'Confirmed Requests']}
                            >
                                {searchedApps.map((item, index) => (
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
                        </div>
                        :
                        null
                    }
                    {searchedReqs.length ?
                        <div className='mb-4'>
                            <h6 className='fw-bold'>Requests Result :</h6>
                            <Table head={['Req ID', 'Target App', 'Method', 'Gateway Address', 'Start Time', 'Confirm Time']}>
                                {searchedReqs.map((item, index) => (
                                    <tr key={index}>
                                        <td className='small'>
                                            <Link href={`/requests/${item.reqId}`}>
                                                {item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}
                                            </Link>
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
                                        <td className='small text-end'>{dateTimeFormat(item.confirmedAt)}</td>
                                    </tr>
                                ))
                                }
                            </Table>
                        </div>
                        :
                        null
                    }
                    {searchedNodes.length ?
                        <div>
                            <h6 className='fw-bold'>Nodes Result :</h6>
                            <Table head={['Node ID', 'Node Address', 'Status', 'Start Time', 'Last Edit Time']}>
                                {searchedNodes.slice(0, 10).map((item, index) => (
                                    <tr key={index}>
                                        <td className='small'>
                                            <Link href={`/nodes/${item.id}`}>
                                                {item.id}
                                            </Link>
                                        </td>
                                        <td className='small pe-md-4'>{item.nodeAddress.slice(0, 10) + '...' + item.nodeAddress.slice(-10)}</td>
                                        <td className='small pe-md-4'>
                                            {(item?.tests?.networking && item?.tests?.peerInfo && item?.tests?.status) ?
                                                'Active' : 'Deactive'
                                            }
                                        </td>
                                        <td className='small'>{dateTimeFormat(item.startTime)}</td>
                                        <td className='small text-end'>{dateTimeFormat(item.lastEditTime)}</td>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                        :
                        null
                    }
                    {!searchedApps.length && !searchedReqs.length && !searchedNodes.length ?
                        <div className='mb-4 text-center'>
                            <h6 className='fw-bold'>No result found</h6>
                        </div>
                        :
                        null
                    }
                </Card>
            </section>

        </MainLayout>
    )
}
