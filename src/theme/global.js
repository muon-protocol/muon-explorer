import { createGlobalStyle } from "styled-components";

export const ThemedGlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box !important;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        list-style: none;
    }

    a {
        text-decoration: none !important;
        color: initial;
    }

    body {
        background-color: ${({ theme }) => theme.palette.gray8} !important;
        font-family: 'Lato';
        overflow-x: hidden;
        color: ${({ theme }) => theme.palette.gray1};
        width: 100vw;
    }

    .smaller {
        font-size: 12px;
    }

    .medium{
        font-size: 18px;
    }

    ::placeholder {
        font-size: 14px;
    }

    input:focus,
    button:focus {
        box-shadow: none !important;
    }

    main{
        min-height: 100vh;
    }
`