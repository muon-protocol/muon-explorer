import { createGlobalStyle } from "styled-components";

// import { Lato } from 'next/font/google'

// const latoFont = Lato({
//     weight: ['400'],
//     subsets: ['latin']
// })

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
        background-color: var(--bg) !important;
        ${'' /* font-family: ${latoFont.style.fontFamily}; */}
        font-family: 'Lato';
        overflow-x: hidden;
    }

    .smaller {
        font-size: 12px;
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