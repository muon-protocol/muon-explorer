import React from 'react'

import MainLayout from 'src/layouts/MainLayout'
import Card from 'src/components/Card';

export default function ApplicationPage() {

    return (
        <MainLayout title='Application Name'>

            <section className='mb-4'>
                <Card title='Muon Request'></Card>
            </section>

        </MainLayout>
    )
}
