import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'

import { Nav, Navbar } from 'react-bootstrap'

import logo from 'public/images/logo.png'

import LandingSearchbar from 'src/sections/Landing/LandingSearchbar'

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.palette.gray2} !important;
`

const StyledHeading = styled.h6`
	color: ${({ theme }) => theme.palette.primary1};
`

const StyledToggle = styled(Navbar.Toggle)`
	background-color: ${({ theme }) => theme.palette.primary3};
`

const HeaderNav = ({ title, path, last }) => {
	const { pathname } = useRouter()

	return (
		<Nav.Item>
			<StyledLink
				className={`nav-link fw-bold ${last ? '' : 'me-2'} ${pathname === `/${path}` ? 'active' : ''}`}
				href={`/${path}`}
			>
				{title}
			</StyledLink>
		</Nav.Item>
	)
}

export default function Header({ landing }) {
	return (
		<header className='px-sm-5 px-4'>
			<Navbar expand='lg' className='py-2'>
				<div className='d-flex flex-grow-1'>
					<Link className='navbar-brand d-flex' href='/'>
						<Image src={logo} alt='muon' />
						<div className='ms-2'>
							<StyledHeading className='fw-bold smaller mb-1'>Muon</StyledHeading>
							<StyledHeading className='fw-bold smaller'>Explorer</StyledHeading>
						</div>
					</Link>
				</div>
				<StyledToggle className='border-0 rounded-3 p-1' />
				<Navbar.Collapse id='navbarScroll' className='flex-grow-0'>
					{!landing && (
						<div className='me-3 mt-lg-0 mt-md-3'>
							<LandingSearchbar />
						</div>
					)}

					<Nav className='me-auto my-2 my-lg-0' navbarScroll>
						<HeaderNav title='Home' path='' />
						<HeaderNav title='Applications' path='applications' />
						<HeaderNav title='Requests' path='requests' />
						<HeaderNav title='Nodes' path='nodes' last />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}
