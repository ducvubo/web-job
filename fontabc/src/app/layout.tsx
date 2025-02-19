import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StoreProvider } from './redux/StoreProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RefreshToken from './auth/cookie/refresh-token'
import { Toaster } from '@/components/ui/sonner'
import GlobalLoading from '@/components/GlobalLoading'
import { LoadingProvider } from '@/context/LoadingContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <LoadingProvider>
          <StoreProvider>
            <GlobalLoading />
            <ToastContainer />
            <Toaster />
            <RefreshToken />
            {/* <ScrollArea className='h-full w-full rounded-md border'>{children}</ScrollArea> */}
            {children}
          </StoreProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
