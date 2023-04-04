import React, { useState } from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { wrapper } from 'src/redux/store';
import { getInfo } from 'src/redux/DataSlice';
import { useSelector } from 'react-redux';

import MainLayout from 'src/layouts/MainLayout'
import AppDetails from 'src/sections/Application/AppDetails'
import ApplicationTab from 'src/sections/Application/ApplicationTab';
import RequestsTab from 'src/sections/Application/RequestsTab';
import Card from 'src/components/Card';
import ChartPills from 'src/sections/Landing/ChartPills';
import LineChart from 'src/components/Chart/LineChart';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
    border: none;
    padding: 8px 0;

    .nav-link {
      background-color: transparent !important;
      border: none;
      color: ${({theme}) => theme.palette.gray5};
      padding: 10px 0.5rem;
      margin-left: 2rem;

      &.active {
      color: ${({theme}) => theme.palette.primary1};
        font-weight: bold;
      }
    }

    &+.tab-content {
      background-color: var(--white);
      border-radius: 1rem;
    }
`

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    await store.dispatch(getInfo())
    return {
        props: {}
    }
})

export default function ApplicationPage() {

    const { chartData, chartLoading } = useSelector(store => store.data)

    const [activeTab, setActiveTab] = useState('application')

    const [length, setLength] = useState(21)

    return (
        <MainLayout title='Application Name'>

            <section className='mb-4'>
                <Card
                    color='gradient2'
                    Header='h5'
                    title='Deus App Requests History'
                    action='pills'
                    actionContent={<ChartPills color='gray7' active={length} setActive={setLength} />}
                >
                    {/* <LineChart data={chartLoading ? [] : chartData} length={length} /> */}
                    <LineChart data={Array(length * 24).fill('').map(() => Math.random() * 100)} length={length} />
                </Card>
            </section>

            <section className='mb-4'>
                <Card>
                    <AppDetails />
                </Card>
            </section>

            <section className='mb-4'>
                <Card
                    color='gray8'
                    shrink
                >
                    <StyledTabs
                        activeKey={activeTab}
                        onSelect={e => setActiveTab(e)}
                        unmountOnExit
                    >
                        <Tab eventKey="application" title="Application">
                            <ApplicationTab />
                        </Tab>

                        <Tab eventKey="requests" title="Requests">
                            <RequestsTab />
                        </Tab>
                    </StyledTabs>
                </Card>
            </section>

        </MainLayout>
    )
}