import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang='en' dir='ltr'>
				<Head>
					<meta charSet='UTF-8' />
					<meta name='author' content='Imazh Branding Studio' />
					<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
					<meta name='theme-color' content='#00000' />
					<meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />

					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
					<link
						href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@700&display=swap'
						rel='stylesheet'
					/>

					{process.env.NETWORK === 'Alice' ? (
						<link rel='manifest' href='/alice/manifest/alice/manifest.json' />
					) : process.env.NETWORK === 'Pion' ? (
						<link rel='manifest' href='/pion/manifest/pion/manifest.json' />
					) : (
						<link rel='manifest' href='/muon/manifest/pion/manifest.json' />
					)}
					{process.env.NETWORK === 'Alice' ? (
						<link rel='icon' type='image/x-icon' href='/alice/manifest/alice/favicon.ico' />
					) : process.env.NETWORK === 'Pion' ? (
						<link rel='icon' type='image/x-icon' href='/pion/manifest/pion/favicon.ico' />
					) : (
						<link rel='icon' type='image/x-icon' href='/muon/manifest/pion/favicon.ico' />
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
