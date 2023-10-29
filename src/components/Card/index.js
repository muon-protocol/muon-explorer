import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

const StyledCard = styled.div`
	background: ${({ theme, color }) => theme.palette[color]};
	color: ${({ theme }) => theme.palette.text} !important;
	border: ${({ theme, border }) =>
		border ? `1px solid ${theme.palette.gray7}` : 'none'} !important;
	& .card-body {
		color: ${({ theme }) => theme.palette.text} !important;
	}
`

const StyledLink = styled(Link)`
	& span {
		color: ${({ theme }) => theme.palette.secondary};
	}
	& path {
		fill: ${({ theme }) => theme.palette.secondary};
	}
`

export default function Card(props) {
	const {
		children,
		color = 'cardBg60',
		link = '/',
		Header = 'h6',
		title,
		action,
		actionContent,
		footerContent,
		shrink,
		border,
	} = props

	return (
		<StyledCard
			className={`card rounded-4 ${
				shrink ? 'p-0' : 'p-3'
			} position-relative overflow-hidden h-100`}
			color={color}
			border={border}
		>
			{title && (
				<div className='card-header border-0 bg-transparent d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center'>
					<Header className='mb-md-0 fw-bold mb-3'>{title}</Header>
					{action === 'more' && (
						<StyledLink href={link}>
							<span className='small me-1'>{actionContent}</span>
							<Icon icon='material-symbols:arrow-right-alt-rounded' />
						</StyledLink>
					)}
					{(action === 'pills' || action === 'search') && actionContent}
				</div>
			)}

			<div className={`card-body bg-transparent pb-0 ${shrink ? 'p-0' : ''}`}>{children}</div>

			{footerContent}
		</StyledCard>
	)
}
