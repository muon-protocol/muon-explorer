import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { SSRProvider } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { wrapper } from 'src/redux/store';
import { Provider as ReduxProvider } from 'react-redux'

import ThemeProvider from 'src/theme';
import { ThemedGlobalStyle } from 'src/theme/global';

export default function App({ Component, ...other }) {

  const { store, props } = wrapper.useWrappedStore(other)

  return (
    <SSRProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <Component {...props.pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </ReduxProvider>
    </SSRProvider>
  )
}
