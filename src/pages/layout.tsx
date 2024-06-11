import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Nav from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../components/theme-provider'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

// Create a client
const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='max-w-2xl m-auto font-mono text-xs md:text-sm lg:text-base tracking-widest border sm:my-2 shadow-lg rounded-md pb-10'>
          <Nav />
          <main className='px-2 md:px-5'>
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
