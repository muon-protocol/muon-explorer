import React from 'react'
import styled from 'styled-components'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Head from 'src/components/Head'

const StyledDiv = styled.div`
	width: 20%;
	height: 10rem;
	position: absolute;
	top: ${({ right, landing }) => (landing ? (right ? '30vh' : '24vh') : right ? '20vh' : '14vh')};
	${({ right }) => (right ? 'right: 10%;' : 'left: 10%;')}
	filter: blur(140px);
	background: ${({ theme, right }) => theme.palette[right ? 'secondary' : 'primaryL1']};
	z-index: -1;
`

const StyledDiv2 = styled(StyledDiv)`
	top: 100vh !important;
	left: 50vw !important;
	background: ${({ theme }) => theme.palette.primaryL1_25} !important;
`

export default function MainLayout({ children, title, landing }) {
	return (
		<main className='d-flex flex-column'>
			<Head title={title} />

			<Header landing={landing} />

			<div className='container mt-5 pt-3 position-relative h-100'>
				<StyledDiv landing={landing} right />
				<StyledDiv landing={landing} />
				{landing && <StyledDiv2 />}
				{children}
			</div>

			<Footer />
		</main>
	)
}
