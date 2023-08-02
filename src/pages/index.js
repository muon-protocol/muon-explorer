import React, { useState } from 'react'
import Link from 'next/link'
import { dateTimeFormat, timeFormat } from 'src/utils/times'
import dynamic from 'next/dynamic'

import useInterval from 'src/hooks/useInterval'

import MainLayout from 'src/layouts/MainLayout'
import LandingSearchbar from 'src/sections/Landing/LandingSearchbar'
import Card from 'src/components/Card'
import Table from 'src/components/Table'
import ChartPills from 'src/sections/Landing/ChartPills'
import RequestsChartFooter from 'src/sections/Landing/RequestsChartFooter'
import NodesChartFooter from 'src/sections/Landing/NodesChartFooter'

import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from 'src/redux/store'
import { getApplications } from 'src/redux/ApplicationsSlice'
import { getRequests } from 'src/redux/RequestsSlice'
import { getActiveNodes, getAllNodes, getDeactiveNodes } from 'src/redux/NodesSlice'

const LineChart = dynamic(() => import('src/components/Chart/LineChart'), { loading: () => <p>loading ...</p> })
const PieChart = dynamic(() => import('src/components/Chart/PieChart'), { loading: () => <p>loading ...</p>, ssr: false })

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
    const { activeNodes, deactiveNodesCount, activeNodesCount } = useSelector(store => store.nodes)

    const dispatch = useDispatch()

    const [length, setLength] = useState(1)

    useInterval({
        deps: [],
        delay: 5000,
        func: () => dispatch(getRequests({ page: 1 }))
    })

    return (
        <MainLayout landing>

            <section className='mb-4'>
                <LandingSearchbar landing />
            </section>

            <section className='mb-4'>
                <Card
                    color='gradient2'
                    Header='h5'
                    title='Muon Requests History'
                    action='pills'
                    actionContent={<ChartPills color='secondary2' active={length} setActive={setLength} />}
                    footerContent={<RequestsChartFooter />}
                >
                    <LineChart data={historyLoading ? [] : requestsHistory} length={length} />
                </Card>
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
                            <Table head={['Req ID', 'Target Application', 'Method', 'Confirm Time']}>
                                {!requests.length ?
                                    <tr>
                                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                                    </tr>
                                    :
                                    requests.map((item, index) => (
                                        <tr key={index}>
                                            <td className='small pe-md-4'>
                                                <Link href={`/requests/${item.reqId}`}>
                                                    {item.reqId.slice(0, 10) + '...' + item.reqId.slice(-10)}
                                                </Link>
                                            </td>
                                            <td className='small pe-md-4'>
                                                <Link href={`/applications/${item.app}`}>
                                                    {item.app}
                                                </Link>
                                            </td>
                                            <td className='small'>{item.method}</td>
                                            <td className='small text-end'>{timeFormat(item?.confirmedAt)}</td>
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
                            <Table head={['Node ID', 'Tier', 'Status', 'Start Time']}>
                                {!activeNodes.length ?
                                    <tr>
                                        <td className='small text-center fw-bold pt-4' colSpan={7}>Nothing found</td>
                                    </tr>
                                    :
                                    activeNodes.slice(0, 10).map((item, index) => (
                                        <tr key={index}>
                                            <td className='small'>
                                                <Link href={`/nodes/${item.id}`}>
                                                    {item.id}
                                                </Link>
                                            </td>
                                            <td className='small'>Tier-1 (Starter)</td>
                                            <td className='small'>
                                                {(item?.tests?.networking && item?.tests?.peerInfo && item?.tests?.status) ?
                                                    'Active' : 'Deactive'
                                                }
                                            </td>
                                            <td className='small text-end'>{dateTimeFormat(item.startTime)}</td>
                                        </tr>
                                    ))}
                            </Table>
                        </Card>
                    </div>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <div className='bg-white rounded-4 h-100'>
                            <Card
                                color='gradient2'
                                title='Muon Nodes Status'
                                footerContent={<NodesChartFooter />}
                            >
                                <div className='d-flex justify-content-center mb-3'>
                                    <PieChart data={[activeNodesCount || 1, deactiveNodesCount || 0]} large />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}
