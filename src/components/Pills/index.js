import React from 'react'
import { Nav } from 'react-bootstrap'
import styled from 'styled-components'

const StyledNav = styled(Nav)`
    background-color: ${({theme}) => theme.palette.gray8};
`

const NavLink = styled(Nav.Link)`
    color: ${({ theme }) => theme.palette.gray5};
    &.active{
        background-color: ${({ theme, color }) => theme.palette[color]} !important;
        color: ${({ theme }) => theme.palette.gray1} !important;
        font-weight: bold;
    }
    &:hover{
        color: ${({ theme }) => theme.palette.gray1};
    }
`

export default function Pills({ items, active, setActive, color }) {
    return (
        <StyledNav
            variant="pills"
            className='rounded-4'
            activeKey={active}
            onSelect={setActive}
        >
            {items?.map((item, index) => (
                <Nav.Item key={index}>
                    <NavLink
                        className='py-1 px-3 smaller rounded-4'
                        eventKey={item.value}
                        color={color}
                    >
                        {item.name}
                    </NavLink>
                </Nav.Item>
            ))}
        </StyledNav>
    )
}
