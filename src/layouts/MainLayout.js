import React from 'react'

import Footer from 'src/components/common/Footer'
import Header from 'src/components/common/Header'
import HeadTag from 'src/components/common/HeadTag'

export default function MainLayout({ children, title }) {
    return (
        <main className='d-flex flex-column'>
            <HeadTag title={`Muon Explorer | ${title}`} />

            <Header />

            <div className='container mt-4'>
                {children}
            </div>

            <Footer />
        </main>
    )
}
