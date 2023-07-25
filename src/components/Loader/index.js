import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
`;

const StyledDiv = styled.div`
    border: 3px solid ${({theme}) => theme.palette.gray11};
    border-top: 3px solid ${({theme}) => theme.palette.primary1};
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin: auto;
    animation: ${spin} 2s linear infinite;
    -webkit-animation: ${spin} 2s linear infinite; /* Safari */
`

export default function Loader() {
    return (
        <StyledDiv />
    )
}
