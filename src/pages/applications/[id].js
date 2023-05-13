import React, { useState } from 'react'
import styled from 'styled-components';
import { Icon } from '@iconify/react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import MainLayout from 'src/layouts/MainLayout'
import AppDetails from 'src/sections/Application/AppDetails'
import ApplicationTab from 'src/sections/Application/ApplicationTab';
import RequestsTab from 'src/sections/Application/RequestsTab';
import Card from 'src/components/Card';
import LineChart from 'src/components/Chart/LineChart';
import Copy from 'src/components/Copy';

import { wrapper } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { getSingleApplication } from 'src/redux/ApplicationsSlice';
import { getRequestHistory } from 'src/redux/RequestsSlice';

const StyledSpan = styled.span`
    color: ${({ theme }) => theme.palette.gray3};
`

const StyledDiv = styled.div`
    background-color: ${({ theme }) => theme.palette.green};
    line-height: 10px;
    & path{
        fill: ${({ theme }) => theme.palette.white};
    }
`

const StyledDevider = styled.div`
    height: 100%;
    width: 0;
    border: 1px dashed ${({ theme }) => theme.palette.white}; 
`

const StyledCol = styled.div`
    height: 200px;
`

const StyledTabs = styled(Tabs)`
    border: none;
    padding: 8px 0;

    .nav-link {
      background-color: transparent !important;
      border: none;
      color: ${({ theme }) => theme.palette.gray3};
      padding: 10px 0.5rem;
      margin-left: 1rem;

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
    await store.dispatch(getRequestHistory({ range: 14, app: query.id }))
    return {
        props: {}
    }
})

export default function ApplicationPage() {

    const { requestsHistory, historyLoading } = useSelector(store => store.requests)
    const { app } = useSelector(store => store.applications)

    const [activeTab, setActiveTab] = useState('application')

    return (
        <MainLayout title={app?.name + ' App'}>

            <section className='mb-4'>
                <Card border>
                    <AppDetails />
                </Card>
            </section>

            <section className='mb-4'>
                <Card color='gradient2'>
                    <div className='row g-lg-1 g-4'>
                        <div className='col-lg-8 col-12 align-self-center'>
                            <div className='row g-md-5 g-4 mb-3 justify-content-between'>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>App ID</StyledSpan>
                                    <div className='d-flex align-items-center mt-2'>
                                        <h5 className='mb-0'>
                                            {app?.data.appId.slice(0, 5) + '...' + app?.data.appId.slice(-5)}
                                        </h5>
                                        <Copy text={app?.data.appId} />
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>Public key Owner</StyledSpan>
                                    <div className='d-flex align-items-center mt-2'>
                                        <h5 className='mb-0'>
                                            {app?.data.contexts[0] ?
                                                app?.data.contexts[0]?.seed.slice(0, 5) +
                                                '...' + app?.data.contexts[0]?.seed.slice(-5)
                                                :
                                                'No data'
                                            }
                                        </h5>
                                        {app?.data.contexts[0] &&
                                            <Copy text={app?.data.contexts[0]?.seed} />
                                        }
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>X / yParity</StyledSpan>
                                    <div className='d-flex align-items-center mt-2'>
                                        <h5 className='mb-0'>
                                            {app?.data.contexts[0] ?
                                                app?.data.contexts[0]?.tss.publicKey.x.slice(0, 5) +
                                                '...' +
                                                app?.data.contexts[0]?.tss.publicKey.x.slice(-5) +
                                                ' / ' +
                                                app?.data.contexts[0]?.tss.publicKey.yParity
                                                :
                                                'No data'
                                            }
                                        </h5>
                                        {app?.data.contexts[0] &&
                                            <Copy text={app?.data.contexts[0]?.tss.publicKey.x + ' / ' + app?.data.contexts[0]?.tss.publicKey.yParity} />
                                        }
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>Seed</StyledSpan>
                                    <div className='d-flex align-items-center mt-2'>
                                        <h5 className='mb-0'>
                                            {app?.data.contexts[0] ?
                                                app?.data.contexts[0]?.tss.publicKey.address.slice(0, 5) +
                                                '...' + app?.data.contexts[0]?.tss.publicKey.address.slice(-5)
                                                :
                                                'No data'
                                            }
                                        </h5>
                                        {app?.data.contexts[0] &&
                                            <Copy text={app?.data.contexts[0]?.tss.publicKey.address} />
                                        }
                                    </div>
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>Threshold</StyledSpan>
                                    <h5 className='mb-0 mt-2'>
                                        {app?.data.contexts[0] ?
                                            app?.data.contexts[0]?.tss.threshold.t +
                                            ' / ' + app?.data.contexts[0]?.tss.threshold.max
                                            :
                                            'No data'
                                        }
                                    </h5>
                                </div>
                                <div className='col-md-4 col-sm-6 col-12 d-flex flex-column'>
                                    <StyledSpan className='small'>Status</StyledSpan>
                                    <div className='d-flex align-items-center mt-2'>
                                        <h5 className='mb-0'>{app?.data.status}</h5>
                                        {app?.data.status === 'DEPLOYED' &&
                                            <StyledDiv className='rounded-3 ms-2'>
                                                <Icon icon="material-symbols:check-small-rounded" width={22} />
                                            </StyledDiv>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-1 d-none d-lg-block'>
                            <StyledDevider className='mx-auto' />
                        </div>
                        <StyledCol className='col-lg-3 col-12 d-flex flex-column justify-content-between'>
                            <StyledSpan className='small mb-5'>{app?.name} App Requests History in 14 days</StyledSpan>
                            <LineChart data={historyLoading ? [] : requestsHistory} length={14} small />
                        </StyledCol>
                    </div>
                </Card>
            </section>

            <section className='mb-4'>
                <Card
                    color='primary7'
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