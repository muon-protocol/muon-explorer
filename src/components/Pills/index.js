import React from 'react'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const StyledNav = styled(Nav)`
	background-color: ${({ theme }) => theme.palette.dateRangeBg};
`

const NavLink = styled(Nav.Link)`
	color: ${({ theme }) => theme.palette.label};
	&.active {
		background-color: ${({ theme }) => theme.palette.primaryL3} !important;
		color: ${({ theme }) => theme.palette.primaryMain} !important;
		font-weight: bold;
	}
	&:hover {
		color: ${({ theme }) => theme.palette.primaryMain};
	}
`

export default function Pills({ items, active, setActive }) {
	return (
		<StyledNav variant='pills' className='rounded-3' activeKey={active} onSelect={setActive}>
			{items?.map((item, index) => (
				<Nav.Item key={index}>
					<NavLink className='py-1 px-3 smaller rounded-3' eventKey={item.value}>
						{item.name}
					</NavLink>
				</Nav.Item>
			))}
		</StyledNav>
	)
}
