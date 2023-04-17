import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components'
import { useSelector } from 'react-redux';

const StyledAccordion = styled(Accordion)`
    & .accordion-button {
      border-radius: 1rem;
      color: var(--gray2);
      background-color: var(--gray8);
      box-shadow: none;

      &:after {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2368687f'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>") !important;
      }
      &:focus {
        box-shadow: none;
      }
    }
`

const StyledItem = styled(Accordion.Item)`
    background-color: ${({ theme }) => theme.palette.gray9};
`

const StyledLabel = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 50rem 50rem 0;
    width: 7rem;
    color: ${({ theme }) => theme.palette.gray2};
    background-color: ${({ theme }) => theme.palette.gray7};
    ${({ theme }) => theme.breakpoints.sm`
        top: -50px;
        right: unset;
        left: 0;
        border-radius: 5rem;
    `}
`

const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.palette.gray8};
`

const StyledButton = styled.button`
    font-size: small;
    letter-spacing: 0.6px;
    color: ${({ theme }) => theme.palette.white};
    background-color: ${({ theme }) => theme.palette.primary1};
`

export default function Methods({ openMethods, setOpenMethods }) {

    const { app } = useSelector(store => store.applications)

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

    return (
        <StyledAccordion
            activeKey={openMethods}
            onSelect={handleMethod}
        >
            {app?.methods.length ?
                app?.methods.map((item, index) => (
                    <StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
                        <Accordion.Header>{item.name}</Accordion.Header>
                        <Accordion.Body>
                            {item.args.map((item2, index2) => (
                                <div key={index2} className='d-flex flex-column mb-1'>
                                    <div className='position-relative mb-3 mt-5 mt-md-0'>
                                        <StyledInput
                                            className='form-control border-0 pe-md-5 rounded-pill'
                                            placeholder={item2.type === 'int' ? 0 : '0x00000000000000000000000000000000'}
                                            type={item2.type === 'int' ? 'number' : 'text'}
                                        />
                                        <StyledLabel className='small h-100 px-3 d-flex align-items-center justify-content-center'>
                                            <span>{item2.name}</span>
                                        </StyledLabel>
                                    </div>
                                </div>
                            ))}
                            <StyledButton className='btn px-5 py-1 rounded-pill align-self-start fw-bold'>Query</StyledButton>
                        </Accordion.Body>
                    </StyledItem>
                ))
                :
                <div className='text-center p-3'>
                    <span className='small'>No methods found</span>
                </div>
            }
        </StyledAccordion>
    )
}