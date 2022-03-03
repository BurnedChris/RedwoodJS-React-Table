import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { RedwoodReactQueryProvider } from './libs/ReactQueryProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { ReactQueryDevtools } from 'react-query/devtools'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60, // 1 mins
    },
  },
})

if (isBrowser) {
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
  })

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  })
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <QueryClientProvider client={queryClient}>
        <RedwoodReactQueryProvider>
          <Routes />
          <ReactQueryDevtools initialIsOpen={false} />
        </RedwoodReactQueryProvider>
      </QueryClientProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
