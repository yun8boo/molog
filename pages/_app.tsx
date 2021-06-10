import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client'
import ProctedPage from '../src/components/ProctedPage';
import '../src/styles/globals.css'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <ProctedPage>
        <Component {...pageProps} />
      </ProctedPage>
    </Provider>
  )
}

export default App