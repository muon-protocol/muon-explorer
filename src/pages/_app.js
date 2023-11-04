import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'prismjs/themes/prism-tomorrow.min.css'
import 'muon-wallet/src/css/index.min.css'

import { ToastContainer } from 'react-toastify'

import { wrapper } from 'src/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

import ThemeProvider from 'src/theme'
import { ThemedGlobalStyle } from 'src/theme/global'

import ErrorBoundry from 'src/layouts/ErrorBoundry'

export default function App({ Component, ...other }) {
	const { store, props } = wrapper.useWrappedStore(other)

	return (
		<ReduxProvider store={store}>
			<ThemeProvider>
				<ThemedGlobalStyle />
				<ErrorBoundry>
					<Component {...props.pageProps} />
				</ErrorBoundry>
				<ToastContainer position={'top-left'} pauseOnFocusLoss={false} />
			</ThemeProvider>
		</ReduxProvider>
	)
}
