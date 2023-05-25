import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import Nav from 'react-bootstrap/Nav';
import Fade from 'react-bootstrap/Fade';

import Card from 'src/components/Card';
import Methods from './Methods';
import Codes from './Codes';

import { useSelector } from 'react-redux';

const StyledNavItem = styled(Nav.Link)`
    font-size: small;
    padding: 5px 0;
    color: ${({ theme }) => theme.palette.gray5};
    border-radius: 0 !important;
    background-color: ${({ theme }) => theme.palette.gray11} !important;

    &.code{
        padding-inline: 2rem !important;
    }

    &.active {
      color: ${({ theme }) => theme.palette.primary1} !important;
      background-color: ${({ theme }) => theme.palette.white} !important;
      font-weight: bold;
    }
`

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.palette.gray9} !important;
    color: ${({ theme }) => theme.palette.gray3} !important;
`

export default function ApplicationTab() {

    const { app } = useSelector(store => store.applications)

    const [activePill, setActivePill] = useState('read')

    const [openMethods, setOpenMethods] = useState([])
    const [openCodes, setOpenCodes] = useState([])

    const [expand, setExpand] = useState(false)

    useEffect(() => {
        if (activePill === 'code') {
            setOpenCodes(app?.codes.map((_, index) => index + 1) || [])
        }
    }, [app?.codes, activePill])

    useEffect(() => {
        if (activePill === 'read') {
            if (openMethods.length) {
                setExpand(true)
            }
            else {
                setExpand(false)
            }
        }
        else {
            if (openCodes.length) {
                setExpand(true)
            }
            else {
                setExpand(false)
            }
        }
    }, [activePill, openMethods, openCodes])

    const handleOpenAll = () => {
        if (!expand) {
            if (activePill === 'read') {
                const all = app?.methods.map((_, index) => index + 1)
                setOpenMethods(all)
            }
            else {
                const all = app?.codes.map((_, index) => index + 1)
                setOpenCodes(all)
            }
        }
        else {
            setOpenMethods([])
            setOpenCodes([])
        }
    }

    const handleActivatePill = (e) => {
        setActivePill(e)
        setOpenMethods([])
    }

    return (
        <Card shrink color='bg4'>
            <div className='d-flex flex-column p-3'>
                <div className='d-flex flex-wrap justify-content-between align-items-center mb-3'>
                    <Nav
                        variant="pills"
                        className='rounded-pill pills mb-4 mb-sm-0 overflow-hidden'
                        defaultActiveKey='read'
                        activeKey={activePill}
                        onSelect={handleActivatePill}
                    >
                        <Nav.Item>
                            <StyledNavItem className='px-3' eventKey='read'>Read Method</StyledNavItem>
                        </Nav.Item>
                        <Nav.Item>
                            <StyledNavItem className='code' eventKey='code'>Code</StyledNavItem>
                        </Nav.Item>
                    </Nav>
                    <StyledButton
                        className='btn smaller rounded-pill px-4 py-2 border-0'
                        onClick={handleOpenAll}
                    >
                        {expand ? 'Close All' : 'Expand All'}
                    </StyledButton>
                </div>

                <Fade in={activePill === 'read'} unmountOnExit>
                    <div>
                        <Methods openMethods={openMethods} setOpenMethods={setOpenMethods} />
                    </div>
                </Fade>

                <Fade in={activePill === 'code'} unmountOnExit>
                    <div>
                        <Codes openCodes={openCodes} setOpenCodes={setOpenCodes} />
                    </div>
                </Fade>
            </div>
        </Card>
    )
}