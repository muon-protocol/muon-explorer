import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components'
import { useSelector } from 'react-redux';

const StyledAccordion = styled(Accordion)`
    & .accordion-button {
      border-radius: 1rem !important;
      color: ${({ theme }) => theme.palette.gray2};
      background-color: ${({ theme }) => theme.palette.gray9};
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

const StyledBody = styled(Accordion.Body)`
    background-color: ${({ theme }) => theme.palette.gray8};
`

const StyledP = styled.p`
    white-space: pre-wrap;
`

export default function Codes({ openCodes, setOpenCodes }) {

    const { app } = useSelector(store => store.applications)

    const handleCode = (e) => {
        const found = openCodes.find(i => i === e)
        if (found) {
            const filtered = openCodes.filter(i => i !== e)
            setOpenCodes(filtered)
        }
        else {
            setOpenCodes([...openCodes, e])
        }
    }

    return (
        <StyledAccordion
            activeKey={openCodes}
            onSelect={handleCode}
        >
            {app?.codes.length ?
                app?.codes.map((item, index) => (
                    <StyledItem className='mb-2 border-0 rounded-4' eventKey={index + 1} key={index}>
                        <Accordion.Header>{item.name}</Accordion.Header>
                        <StyledBody>
                            <StyledP className='mb-0 small'>{item.code}</StyledP>
                        </StyledBody>
                    </StyledItem>
                ))
                :
                <div className='text-center p-3'>
                    <span className='small'>No codes found</span>
                </div>
            }
        </StyledAccordion>
    )
}