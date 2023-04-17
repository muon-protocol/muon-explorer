import React from 'react'
import Head from 'src/components/Head'

export default function Error404() {
    return (
        <main className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
            <Head title='Muon Explorer | 404' />
            <h5 className='fw-bold'>404 | Page not found</h5>
        </main>
    )
}
