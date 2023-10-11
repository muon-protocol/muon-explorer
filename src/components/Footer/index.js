import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

import logo2 from 'public/images/logo-2.png'

const FooterLogo = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`

const StyledAnchor = styled.a`
	& path {
		fill: ${({ theme }) => theme.palette.gray6};
	}
`

const StyledHeading = styled.h6`
	& span {
		color: ${({ theme }) => theme.palette.gray3};
	}
	& a {
		color: ${({ theme }) => theme.palette.gray1};
	}
`

const FooterIcon = ({ icon, last }) => {
	return (
		<StyledAnchor className={last ? '' : 'me-4'} href='#'>
			<Icon icon={icon} width='34' />
		</StyledAnchor>
	)
}

export default function Footer() {
	return (
		<footer className='px-5 mt-auto position-relative'>
			<div className='d-flex flex-column-reverse flex-md-row pt-3 pb-5 pb-md-3'>
				<div className='flex-grow-1'>
					<FooterLogo className='d-flex'>
						<Image src={logo2} alt='muon' />
						<StyledHeading className='ms-2'>
							<span className='me-1'>by</span>
							<Link className='fw-bold text-decoration-underline' href='https://muon.net' target='_blank'>
								Muon.Net
							</Link>
						</StyledHeading>
					</FooterLogo>
				</div>
				<div className='d-flex mb-4 mb-md-0 align-self-center'>
					<FooterIcon icon='ic:baseline-discord' />
					<FooterIcon icon='mdi:twitter' />
					<FooterIcon icon='ic:baseline-telegram' />
					<FooterIcon icon='ic:baseline-discord' last />
				</div>
			</div>
		</footer>
	)
}
