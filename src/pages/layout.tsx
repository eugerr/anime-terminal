import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Nav from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../components/theme-provider'

// Create a client
const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Nav />
        <main className='container font-mono text-xs md:text-sm lg:text-base'>
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
