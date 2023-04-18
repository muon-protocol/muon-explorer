import React, { useState } from 'react'
import Link from 'next/link'

// import useInterval from 'src/hooks/useInterval'

import MainLayout from 'src/layouts/MainLayout'
import LineChart from 'src/components/Chart/LineChart'
import PieChart from 'src/components/Chart/PieChart'
import LandingSearchbar from 'src/sections/Landing/LandingSearchbar'
import Card from 'src/components/Card'
import Table from 'src/components/Table'
import ChartPills from 'src/sections/Landing/ChartPills'
import RequestsChartFooter from 'src/sections/Landing/RequestsChartFooter'
import NodesChartFooter from 'src/sections/Landing/NodesChartFooter'

import { useSelector } from 'react-redux'
import { wrapper } from 'src/redux/store'
import { getApplications } from 'src/redux/ApplicationsSlice'
import { getRequests } from 'src/redux/RequestsSlice'
import { getActiveNodes, getAllNodes, getDeactiveNodes } from 'src/redux/NodesSlice'

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const req1 = store.dispatch(getApplications({}))
    const req2 = store.dispatch(getRequests({}))
    const req3 = store.dispatch(getAllNodes({}))
    const req4 = store.dispatch(getActiveNodes({}))
    const req5 = store.dispatch(getDeactiveNodes({}))
    await Promise.all([req1, req2, req3, req4, req5])
    return {
        props: {}
    }
})

export default function Landing() {

    const { applications } = useSelector(store => store.applications)
    const { requests, requestsHistory, historyLoading } = useSelector(store => store.requests)
    const { nodes, deactiveNodes, activeNodes } = useSelector(store => store.nodes)

    const [length, setLength] = useState(1)

    // useInterval({
    //     deps: [],
    //     delay: 5000,
    //     func: () => getRequests({ page: 1 })
    // })

    return (
        <MainLayout>

            <section className='mb-4'>
                <LandingSearchbar />
            </section>

            <section className='mb-4'>
                <div className='bg-white rounded-4'>
                    <Card
                        color='gradient2'
                        Header='h5'
                        title='Muon Requests History'
                        action='pills'
                        actionContent={<ChartPills color='secondary1' active={length} setActive={setLength} />}
                        footerContent={<RequestsChartFooter />}
                    >
                        <LineChart data={historyLoading ? [] : requestsHistory} length={length} />
                    </Card>
                </div>
            </section>

            <section className='mb-4'>
                <div className='row g-4 justify-content-center'>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <Card
                            title='Most Used Applications'
                            action='more'
                            actionContent='View All Apps'
                            link='/applications'
                        >
                            <Table head={['App Name', 'Most Used Methods', '#Methods', 'Confirmed Requests']}>
                                {!applications.length ?
                                    <tr>
                                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                                    </tr>
                                    :
                                    applications.map((item, index) => (
                                        <tr key={index}>
                                            <td className='small pe-md-4'>
                                                <Link href={`/applications/${item.id}`}>
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className='small pe-md-4'>{item.mostUsedMethod}</td>
                                            <td className='small'>{item.methods.length || 0}</td>
                                            <td className='small text-end'>{item.confirmed_requests}</td>
                                        </tr>
                                    ))
                                }
                            </Table>
                        </Card>
                    </div>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <Card
                            title='Latest Requests'
                            action='more'
                            actionContent='View All Requests'
                            link='/requests'
                        >
                            <Table head={['Req Address', 'Target Application', 'Method', 'Confirm Time']}>
                                {!requests.length ?
                                    <tr>
                                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                                    </tr>
                                    :
                                    requests.map((item, index) => (
                                        <tr key={index}>
                                            <td className='small pe-md-4'>{item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}</td>
                                            <td className='small pe-md-4'>{item.app}</td>
                                            <td className='small'>{item.method}</td>
                                            <td className='small text-end'>{new Date(item.confirmedAt)?.toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </Table>
                        </Card>
                    </div>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <Card
                            title='Most Active Nodes'
                            action='more'
                            actionContent='View All Nodes'
                            link='/nodes'
                        >
                            <Table head={['Node ID', 'Node Address', 'Status', 'Start Time']}>
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
                                            <td className='small text-end'>{new Date(item.startTime)?.toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </Table>
                        </Card>
                    </div>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <div className='bg-white rounded-4'>
                            <Card
                                color='gradient2'
                                title='Muon Nodes Status'
                                footerContent={<NodesChartFooter />}
                            >
                                <PieChart data={[activeNodes, deactiveNodes]} />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}
