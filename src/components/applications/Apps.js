import React, { useState } from 'react'

import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import Fade from 'react-bootstrap/Fade';

import { useSelector } from 'react-redux';

export default function Apps() {

    const { info } = useSelector(store => store.data)

    const [activePill, setActivePill] = useState('read')

    const [openMethods, setOpenMethods] = useState([])

    const [expand, setExpand] = useState(false)

    const handleMethod = (e) => {
        const found = openMethods.find(i => i === e)
        if (found) {
            const filtered = openMethods.filter(i => i !== e)
            setOpenMethods(filtered)
        }
        else {
            setOpenMethods([...openMethods, e])
        }
    }

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
        <div className='card border-0 rounded-4 m-3'>

            <div className='card-header d-flex flex-wrap justify-content-between bg-white border-0'>
                <Nav
                    variant="pills"
                    className='bg-gray10 rounded-3 pills p-1 mb-4 mb-sm-0'
                    defaultActiveKey='read'
                    activeKey={activePill}
                    onSelect={e => setActivePill(e)}
                >
                    <Nav.Item>
                        <Nav.Link className='px-3 text-gray7' eventKey='read'>Read Method</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='px-4 text-gray7' eventKey='code'>Code</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Fade in={activePill === 'read'}>
                    <button
                        className='btn bg-gray11 smaller rounded-pill px-4 py-1 border-0'
                        onClick={handleOpenAll}
                    >
                        {expand ? 'Close All' : 'Expand All'}
                    </button>
                </Fade>
            </div>

            <div className='card-body bg-white'>

                <Fade in={activePill === 'read'} unmountOnExit>
                    <Accordion
                        className='read-methods'
                        activeKey={openMethods}
                        onSelect={handleMethod}
                    >
                        {info?.methods.map((item, index) => (
                            <Accordion.Item className='mb-2 border-0 rounded-4 bg-gray11' eventKey={index + 1} key={index}>
                                <Accordion.Header>{item.name}</Accordion.Header>
                                <Accordion.Body>
                                    {item.args.map((item2, index2) => (
                                        <div key={index2} className='d-flex flex-column mb-3'>
                                            <div className='position-relative mb-3 mt-5 mt-md-0'>
                                                <input
                                                    className='form-control bg-gray10 border-0 pe-md-5 rounded-pill'
                                                    placeholder={item2.type === 'int' ? 0 : '0x00000000000000000000000000000000'}
                                                    type={item2.type === 'int' ? 'number' : 'text'}
                                                />
                                                <div className='text-gray2 bg-gray9 small h-100 px-3 input-label d-flex align-items-center'>
                                                    <span>{item2.name}</span>
                                                </div>
                                            </div>
                                            <button className='btn bg-primary text-white px-5 py-1 rounded-pill align-self-start fw-bold'>Query</button>
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Fade>

                <Fade in={activePill === 'code'} unmountOnExit>
                    <div className='code bg-gray11 p-4 rounded-4'>
                        <p className='mb-0 small'>{info?.code}</p>
                    </div>
                </Fade>

            </div>
        </div>
    )
}
