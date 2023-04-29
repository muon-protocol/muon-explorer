import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
    &.custom-card .percent {
      position: relative;
    }

    &.custom-card svg {
      position: relative;
      width: 120px;
      height: 120px;
      transform: rotate(-180deg);
    }

    &.custom-card svg circle {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: transparent;
      stroke-width: 7;
      stroke-linecap: round;
    }

    &.custom-card svg circle:last-of-type {
      stroke-dasharray: 308px;
      stroke-dashoffset: calc(308px - (308px * var(--percent)) / 100);
      stroke: ${({ theme }) => theme.palette.primary1}; 
    }

    &.custom-card .number {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${({ theme }) => theme.palette.gradient3};
      width: 60%;
      height: 60%;
    }
`

export default function Progress({ value = '50%' }) {

  const newValue = Number(value.slice(0,-1))

  return (
    <StyledCard className="custom-card">
      <div className="percent">
        <svg>
          <circle cx="60" cy="60" r="50"></circle>
          <circle cx="60" cy="60" r="50" style={{ '--percent': newValue }}></circle>
        </svg>
        <div className="number rounded-circle d-flex justify-content-center align-items-center">
          <h5 className='mb-0'>{newValue}<span className='small ms-1'>%</span></h5>
        </div>
      </div>
    </StyledCard>
  )
}
