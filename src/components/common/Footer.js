import React from 'react'

import Link from 'next/link';
import Image from 'next/image';

import logo2 from 'public/images/logo-2.png'

import { Icon } from '@iconify/react';

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
          <a className='me-4' href='#'>
            <Icon icon="ic:baseline-discord" width="34" />
          </a>
          <a className='me-4' href='#'>
            <Icon icon="mdi:twitter" width="34" />
          </a>
          <a className='me-4' href='#'>
            <Icon icon="ic:baseline-telegram" width="34" />
          </a>
          <a href='#'>
            <Icon icon="ic:baseline-discord" width="34" />
          </a>
        </div>
      </div>
    </footer>
  )
}
