import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import logo from 'public/images/logo.png'

import { Nav, Navbar } from 'react-bootstrap'


export default function Header() {

    const { pathname } = useRouter()

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
                        <Nav.Item>
                            <Link className={`nav-link fw-bold text-gray1 me-2 ${pathname === '/' ? 'active' : ''}`} href='/'>Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={`nav-link fw-bold text-gray1 me-2 ${pathname === '/applications' ? 'active' : ''}`} href='/applications'>Applications</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={`nav-link fw-bold text-gray1 me-2 ${pathname === '/requests' ? 'active' : ''}`} href='/requests'>Requests</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={`nav-link fw-bold text-gray1 ${pathname === '/nodes' ? 'active' : ''}`} href='/nodes'>Nodes</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
