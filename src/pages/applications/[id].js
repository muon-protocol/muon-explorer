import React, { useState } from 'react'
import styled from 'styled-components';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import MainLayout from 'src/layouts/MainLayout'
import AppDetails from 'src/sections/Application/AppDetails'
import ApplicationTab from 'src/sections/Application/ApplicationTab';
import RequestsTab from 'src/sections/Application/RequestsTab';
import Card from 'src/components/Card';
import ChartPills from 'src/sections/Landing/ChartPills';
import LineChart from 'src/components/Chart/LineChart';

import { wrapper } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { getSingleApplication } from 'src/redux/ApplicationsSlice';

const StyledTabs = styled(Tabs)`
    border: none;
    padding: 8px 0;

    .nav-link {
      background-color: transparent !important;
      border: none;
      color: ${({ theme }) => theme.palette.gray5};
      padding: 10px 0.5rem;
      margin-left: 2rem;

      &.active {
      color: ${({ theme }) => theme.palette.primary1};
        font-weight: bold;
      }
    }

    &+.tab-content {
      background-color: ${({ theme }) => theme.palette.white};
      border-radius: 1rem;
    }
`

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    const res = await store.dispatch(getSingleApplication(query.id))
    if (res.payload?.status !== 200) {
        return {
            notFound: true
        }
    }
    return {
        props: {}
    }
})

export default function ApplicationPage() {

    const { requestsHistory, historyLoading } = useSelector(store => store.requests)
    const { app } = useSelector(store => store.applications)

    const [activeTab, setActiveTab] = useState('application')

    const [length, setLength] = useState(1)

    return (
        <MainLayout title={app?.name + ' App'}>

            <section className='mb-4'>
                <Card
                    color='gradient2'
                    Header='h5'
                    title={`${app?.name} App Requests History`}
                    action='pills'
                    actionContent={<ChartPills color='gray7' active={length} setActive={setLength} app={app?.id} />}
                >
                    <LineChart data={historyLoading ? [] : requestsHistory} length={length} />
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