import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'

import { Nav, Navbar } from 'react-bootstrap'

import LandingSearchbar from 'src/sections/Landing/LandingSearchbar'

import { themeLogoImageHandler } from 'src/utils/helpers'

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.palette.text} !important;
`

const StyledHeading = styled.h6`
	background: ${({ theme }) => theme.palette.gradient1};
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-size: 14px;
	font-family: 'Montserrat';
`

const StyledToggle = styled(Navbar.Toggle)`
	background-color: ${({ theme }) => theme.palette.primaryL3};
`

const HeaderNav = ({ title, path, last }) => {
	const { pathname } = useRouter()

	return (
		<Nav.Item>
			<StyledLink
				className={`nav-link fw-bold ${last ? '' : 'me-2'} ${
					pathname === `/${path}` ? 'active' : ''
				}`}
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
						<Image src={themeLogoImageHandler()} alt='muon' />
						<div className='ms-2'>
							<StyledHeading className='fw-bold mb-0'>{process.env.NETWORK}</StyledHeading>
							<StyledHeading className='fw-bold'>Explorer</StyledHeading>
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
