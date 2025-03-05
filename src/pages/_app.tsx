import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { UserStoreProvider } from '@/providers/user-store.provider'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserStoreProvider>
      <Component {...pageProps} />
    </UserStoreProvider>
  )
}