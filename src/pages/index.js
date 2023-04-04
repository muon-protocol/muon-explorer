import React, { useState } from 'react'

import MainLayout from 'src/layouts/MainLayout'
import LineChart from 'src/components/Chart/LineChart'
import PieChart from 'src/components/Chart/piechart'
import LandingSearchbar from 'src/sections/Landing/LandingSearchbar'
import Card from 'src/components/Card'
import Table from 'src/components/Table'
import ChartPills from 'src/sections/Landing/ChartPills'
import RequestsChartFooter from 'src/sections/Landing/RequestsChartFooter'
import NodesChartFooter from 'src/sections/Landing/NodesChartFooter'

import { useSelector } from 'react-redux'

export default function Landing() {

    const { chartData, chartLoading } = useSelector(store => store.data)

    const [length, setLength] = useState(21)

    return (
        <MainLayout title='Landing'>

            <section className='mb-4'>
                <LandingSearchbar />
            </section>

            <section className='mb-4'>
                <Card
                    color='gradient2'
                    Header='h5'
                    title='Muon Requests History'
                    action='pills'
                    actionContent={<ChartPills color='secondary1' active={length} setActive={setLength} />}
                    footerContent={<RequestsChartFooter />}
                >
                    {/* <LineChart data={chartLoading ? [] : chartData} length={length} /> */}
                    <LineChart data={Array(length * 24).fill('').map(() => Math.random() * 100)} length={length} />
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
                                {Array(10).fill('').map((item, index) => (
                                    <tr key={index}>
                                        <td className='small pe-4 pe-md-5'>Muon Main App</td>
                                        <td className='small pe-md-4'>FTM Price</td>
                                        <td className='small'>129</td>
                                        <td className='small text-end'>46,394</td>
                                    </tr>
                                ))}
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
                                {Array(10).fill('').map((item, index) => (
                                    <tr key={index}>
                                        <td className='small pe-4 pe-md-5'>Muon Main App</td>
                                        <td className='small pe-md-4'>FTM Price</td>
                                        <td className='small'>129</td>
                                        <td className='small text-end'>46,394</td>
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
                            <Table head={['Node Address', 'Status', '#Signed Requests', 'Start Time']}>
                                {Array(10).fill('').map((item, index) => (
                                    <tr key={index}>
                                        <td className='small pe-4 pe-md-5'>Muon Main App</td>
                                        <td className='small pe-md-4'>FTM Price</td>
                                        <td className='small'>129</td>
                                        <td className='small text-end'>46,394</td>
                                    </tr>
                                ))}
                            </Table>
                        </Card>
                    </div>
                    <div className='col-xl-6 col-lg-10 col-12'>
                        <Card
                            color='gradient2'
                            title='Muon Nodes Status'
                            footerContent={<NodesChartFooter />}
                        >
                            <PieChart data={[232, 2632]} />
                        </Card>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}
