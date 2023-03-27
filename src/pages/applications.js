import React, { useState } from 'react'

import MainLayout from 'src/layouts/MainLayout'
import AppDetails from 'src/sections/Applications/AppDetails'
import ChartBox from 'src/sections/Applications/ChartBox'
import Apps from 'src/sections/Applications/ApplicationTab';
import Reqs from 'src/sections/Applications/RequestsTab';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { wrapper } from 'src/redux/store';
import { getInfo } from 'src/redux/DataSlice';

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    await store.dispatch(getInfo())
    return {
        props: {}
    }
})

export default function Applications() {

    const [activeTab, setActiveTab] = useState('application')

    return (
        <MainLayout title='Applications'>

            <section className='app-history mb-5'>
                <ChartBox />
            </section>

            <section className='mb-5'>
                <AppDetails />
            </section>

            <section className='apps-and-reqs mb-5'>
                <div className='card shadow border-0 rounded-4 overflow-hidden bg-gray10'>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={e => setActiveTab(e)}
                        unmountOnExit
                    >
                        <Tab eventKey="application" title="Application">
                            <Apps />
                        </Tab>

                        <Tab eventKey="requests" title="Requests">
                            <Reqs />
                        </Tab>
                    </Tabs>

                </div>
            </section>

        </MainLayout>
    )
}
