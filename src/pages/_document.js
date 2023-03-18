import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" dir='ltr'>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Imazh Branding Studio" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel='manifest' href='/manifest.json' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
