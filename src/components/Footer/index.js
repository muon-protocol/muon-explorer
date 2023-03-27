import React from 'react'

import Link from 'next/link';
import Image from 'next/image';

import logo2 from 'public/images/logo-2.png'

import { Icon } from '@iconify/react';

const FooterIcon = ({ icon, last }) => {
    return (
        <a className={last ? '' : 'me-4'} href='#'>
            <Icon icon={icon} width="34" />
        </a>
    )
}

export default function Footer() {
    return (
        <footer className='px-5 mt-auto position-relative'>
            <div className='d-flex flex-column-reverse flex-md-row pt-3 pb-5 pb-md-3'>
                <div className='logo-cont flex-grow-1'>
                    <div className='d-flex footer-logo'>
                        <Image src={logo2} alt='muon' />
                        <h6 className='ms-2'>
                            <span className='text-gray5 me-1'>by</span>
                            <Link className='text-gray1 fw-bold text-decoration-underline' href='/'>Muon.Net</Link>
                        </h6>
                    </div>
                </div>
                <div className='d-flex icons mb-4 mb-md-0 align-self-center'>
                    <FooterIcon icon='ic:baseline-discord' />
                    <FooterIcon icon='mdi:twitter' />
                    <FooterIcon icon='ic:baseline-telegram' />
                    <FooterIcon icon='ic:baseline-discord' last />
                </div>
            </div>
        </footer>
    )
}
