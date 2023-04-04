import React, { useState } from 'react'
import styled from 'styled-components';

import Nav from 'react-bootstrap/Nav';
import Fade from 'react-bootstrap/Fade';

import { useSelector } from 'react-redux';

import Card from 'src/components/Card';
import Methods from './Methods';

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

const StyledDiv = styled.div`
    background-color: ${({ theme }) => theme.palette.gray9} !important;
    & p{
        white-space: pre-wrap;
    }
`

export default function ApplicationTab() {

    const { info } = useSelector(store => store.data)

    const [activePill, setActivePill] = useState('read')

    const [openMethods, setOpenMethods] = useState([])

    const [expand, setExpand] = useState(false)

    const handleOpenAll = () => {
        if (!expand) {
            const all = info.methods.map((_, index) => index + 1)
            setOpenMethods(all)
            setExpand(true)
        }
        else {
            setOpenMethods([])
            setExpand(false)
        }
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
                        onSelect={e => setActivePill(e)}
                    >
                        <Nav.Item>
                            <StyledNavItem className='px-3' eventKey='read'>Read Method</StyledNavItem>
                        </Nav.Item>
                        <Nav.Item>
                            <StyledNavItem className='px-4' eventKey='code'>Code</StyledNavItem>
                        </Nav.Item>
                    </StyledNav>
                    <Fade in={activePill === 'read'}>
                        <StyledButton
                            className='btn smaller rounded-pill px-4 py-1 border-0'
                            onClick={handleOpenAll}
                        >
                            {expand ? 'Close All' : 'Expand All'}
                        </StyledButton>
                    </Fade>
                </div>

                <Fade in={activePill === 'read'} unmountOnExit>
                    {!info?.methods ?
                        <div className='text-center p-3'>
                            <span className='small'>No methods found</span>
                        </div>
                        :
                        <Methods openMethods={openMethods} setOpenMethods={setOpenMethods} />
                    }
                </Fade>

                <Fade in={activePill === 'code'} unmountOnExit>
                    <StyledDiv className='p-4 rounded-4'>
                        <p className='mb-0 small'>{info?.code || 'No code found'}</p>
                    </StyledDiv>
                </Fade>
            </div>
        </Card>
    )
}