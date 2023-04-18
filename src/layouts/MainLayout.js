import React from 'react'
import styled from 'styled-components'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Head from 'src/components/Head'

const StyledDiv = styled.div`
    width: 40%;
    height: 20rem;
    position: absolute;
    top: ${({ right }) => right ? '25vh' : '15vh'};
    ${({ right }) => right ? 'right: 0;' : 'left: 0;'}
    filter: blur(140px);
    background: ${({ theme, right }) => theme.palette[right ? 'secondary1' : 'primary1']};
    z-index: -1;
`

export default function MainLayout({ children, title }) {
    return (
        <main className='d-flex flex-column'>
            <Head title={title ? `Muon Explorer | ${title}` : 'Muon Explorer'} />

            <Header />

            <div className='container mt-4 position-relative'>

                <StyledDiv right />
                <StyledDiv />

                {children}
            </div>

            <Footer />
        </main>
    )
}
