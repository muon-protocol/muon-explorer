import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

import muon_net from 'public/images/logo/muon-net.png'

const FooterLogo = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`

const StyledAnchor = styled.a`
	& path {
		fill: ${({ theme }) => theme.palette.primaryL3};
	}
`

const StyledHeading = styled.h6`
	& span {
		color: ${({ theme }) => theme.palette.primaryL3};
	}
`

const FooterIcon = ({ icon, last, href }) => {
	return (
		<StyledAnchor className={last ? '' : 'me-4'} href={href} target='_blank'>
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
						<StyledHeading className='ms-2'>
							<span className='me-2 small'>Powered by</span>
							<Image src={muon_net} alt='muon' />
						</StyledHeading>
					</FooterLogo>
				</div>
				<div className='d-flex mb-4 mb-md-0 align-self-center'>
					<FooterIcon icon='ic:baseline-discord' href='https://discord.gg/muonnetwork' />
					<FooterIcon icon='mdi:twitter' href='https://twitter.com/muon_net' />
					<FooterIcon icon='ic:baseline-telegram' last href='https://t.me/Muon_net' />
					{/* <FooterIcon icon='ic:baseline-discord' last /> */}
				</div>
			</div>
		</footer>
	)
}
