import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import logo from 'public/images/logo.png'

import { Nav, Navbar } from 'react-bootstrap'

const HeaderNav = ({ title, path, last }) => {

    const { pathname } = useRouter()

    return (
        <Nav.Item>
            <Link
                className={`nav-link fw-bold text-gray1 ${last ? '' : 'me-2'} ${pathname === `/${path}` ? 'active' : ''}`}
                href={`/${path}`}
            >
                {title}
            </Link>
        </Nav.Item>
    )
}


export default function Header() {

    return (
        <header className='px-5'>
            <Navbar expand="sm" className='py-2'>
                <div className='d-flex flex-grow-1'>
                    <Link className='navbar-brand d-flex' href='/'>
                        <Image src={logo} alt='muon' />
                        <div className='ms-2'>
                            <h6 className='text-primary fw-bold smaller mb-1'>Muon</h6>
                            <h6 className='text-primary fw-bold smaller'>Explorer</h6>
                        </div>
                    </Link>
                </div>
                <Navbar.Toggle aria-controls="navbarScroll" className='bg-primary-low border-0 rounded-3 p-1' />
                <Navbar.Collapse id="navbarScroll" className='flex-grow-0'>
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>

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
