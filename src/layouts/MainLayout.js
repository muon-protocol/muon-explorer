import React from 'react'
import styled from 'styled-components'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Head from 'src/components/Head'

const StyledDiv = styled.div`
    width: 20%;
    height: 10rem;
    position: absolute;
    top: ${({ right }) => right ? '20vh' : '14vh'};
    ${({ right }) => right ? 'right: 10%;' : 'left: 10%;'}
    filter: blur(140px);
    background: ${({ theme, right }) => theme.palette[right ? 'secondary1' : 'primary1']};
    z-index: -1;
`

export default function MainLayout({ children, title, landing }) {
    return (
        <main className='d-flex flex-column'>
            <Head title={title ? `Muon Explorer | ${title}` : 'Muon Explorer'} />

            <Header landing={landing} />

            <div className='container mt-5 pt-3 position-relative'>

                <StyledDiv right />
                <StyledDiv />

                {children}
            </div>

            <Footer />
        </main>
    )
}
