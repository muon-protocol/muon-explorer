import React, { useState } from 'react'
import styled from 'styled-components';

import Nav from 'react-bootstrap/Nav';
import Fade from 'react-bootstrap/Fade';

import Card from 'src/components/Card';
import Methods from './Methods';
import Codes from './Codes';

import { useSelector } from 'react-redux';

const StyledNav = styled(Nav)`
    background-color: ${({ theme }) => theme.palette.gray8};
`

const StyledNavItem = styled(Nav.Link)`
    font-size: small;
    padding: 2px 0;
    color: ${({ theme }) => theme.palette.gray5};

    &.active {
      color: ${({ theme }) => theme.palette.primary1} !important;
      background-color: ${({ theme }) => theme.palette.white} !important;
      font-weight: bold;
    }
`

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.palette.gray9} !important;
`

export default function ApplicationTab() {

    const { app } = useSelector(store => store.applications)

    const [activePill, setActivePill] = useState('read')

    const [openMethods, setOpenMethods] = useState([])
    const [openCodes, setOpenCodes] = useState([])

    const [expand, setExpand] = useState(false)

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
            setExpand(true)
        }
        else {
            setOpenMethods([])
            setOpenCodes([])
            setExpand(false)
        }
    }

    const handleActivatePill = (e) => {
        setActivePill(e)
        setOpenMethods([])
        setOpenCodes([])
        setExpand(false)
    }

    return (
        <Card shrink>
            <div className='d-flex flex-column p-3'>
                <div className='d-flex flex-wrap justify-content-between mb-3'>
                    <StyledNav
                        variant="pills"
                        className='rounded-3 pills p-1 mb-4 mb-sm-0'
                        defaultActiveKey='read'
                        activeKey={activePill}
                        onSelect={handleActivatePill}
                    >
                        <Nav.Item>
                            <StyledNavItem className='px-3' eventKey='read'>Read Method</StyledNavItem>
                        </Nav.Item>
                        <Nav.Item>
                            <StyledNavItem className='px-4' eventKey='code'>Code</StyledNavItem>
                        </Nav.Item>
                    </StyledNav>
                    <StyledButton
                        className='btn smaller rounded-pill px-4 py-1 border-0'
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