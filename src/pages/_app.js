import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

import 'src/styles/fonts.scss'
import 'src/styles/variables.scss'
import 'src/styles/general.scss'
import 'src/styles/overrides.scss'
import 'src/styles/main.scss'
import 'src/styles/responsive.scss'

import { SSRProvider } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { wrapper } from 'src/redux/store';
import { Provider as ReduxProvider } from 'react-redux'

export default function App({ Component, ...other }) {

  const { store, props } = wrapper.useWrappedStore(other)

  return (
    <SSRProvider>
      <ReduxProvider store={store}>
          <Component {...props.pageProps} />
          <ToastContainer />
      </ReduxProvider>
    </SSRProvider>
  )
}
