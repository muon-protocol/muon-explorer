import React from 'react'
import Link from 'next/link';

import MainLayout from 'src/layouts/MainLayout'
import LandingSearchbar from 'src/sections/Landing/LandingSearchbar';
import Card from 'src/components/Card';
import Table from 'src/components/Table';

import { useSelector } from 'react-redux';

export default function Search() {

    const { searchedApps } = useSelector(store => store.applications)
    const { searchedReqs } = useSelector(store => store.requests)
    const { searchedNodes } = useSelector(store => store.nodes)

    return (
        <MainLayout title='Search'>

            <section className='mb-4'>
                <LandingSearchbar />
            </section>

            <section className='mb-4'>
                <Card>
                    {searchedApps.length ?
                        <div className='mb-4'>
                            <h6 className='fw-bold'>Applications Result :</h6>
                            <Table
                                head={['App Name', 'Most Used Method', '#Methods',
                                    'Nodes on app', 'Confirmed Requests', 'Start Time']}
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
                                        <td className='small'>{item.searchedNodes}</td>
                                        <td className='small'>{item.confirmed_requests}</td>
                                        <td className='small text-end'>{new Date(item.startTime)?.toLocaleString()}</td>
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
                            <Table
                                head={['Req Address', 'Target App', 'Method', 'Gateway Address',
                                    '#Signatures', 'Start Time', 'Confirm Time']}
                            >
                                {searchedReqs.map((item, index) => (
                                    <tr key={index}>
                                        <td className='small'>{item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}</td>
                                        <td className='small'>{item.app}</td>
                                        <td className='small'>{item.method}</td>
                                        <td className='small'>{item.gwAddress.slice(0, 10) + '...' + item.gwAddress.slice(-10)}</td>
                                        <td className='small'>{item.signatures.length || 0}</td>
                                        <td className='small'>{new Date(item.startedAt)?.toLocaleString()}</td>
                                        <td className='small text-end'>{new Date(item.confirmedAt)?.toLocaleString()}</td>
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
                                        <td className='small'>{item.id}</td>
                                        <td className='small pe-md-4'>{item.nodeAddress.slice(0, 10) + '...' + item.nodeAddress.slice(-10)}</td>
                                        <td className='small pe-md-4'>{item.active ? 'Active' : 'Paused'}</td>
                                        <td className='small'>{new Date(item.startTime)?.toLocaleString()}</td>
                                        <td className='small text-end'>{new Date(item.lastEditTime)?.toLocaleString()}</td>
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
