import React from 'react'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Head from 'src/components/Head'

export default function MainLayout({ children, title }) {
    return (
        <main className='d-flex flex-column'>
            <Head title={`Muon Explorer | ${title}`} />

            <Header />

            <div className='container mt-4'>
                {children}
            </div>

            <Footer />
        </main>
    )
}
