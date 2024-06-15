import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Nav from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../components/theme-provider'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
// import { ModeToggle } from '@/components/mode-toggle'

// Create a client
const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        {/* <ModeToggle /> */}
        <div className='min-h-screen border text-xs md:text-base p-2 shadow-lg rounded-md font-mono'>
          <Nav />
          <main className='px-2 md:px-5'>
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
