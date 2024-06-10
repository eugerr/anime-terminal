import { ModeToggle } from './mode-toggle'
import { Link, useLocation } from 'react-router-dom'
export default function Nav() {
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const isWatchPage = location.pathname.includes('/watch')
  const isResultsPage = location.pathname.includes('/results')
  const isEpisodesPage = location.pathname.includes('/episodes')
  return (
    <>
      <div className='bg-secondary w-full h-10 mb-2 relative px-2 md:px-5 flex gap-2 items-center'>
        <div className='h-2 w-2 rounded-full bg-green-400'></div>
        <div className='h-2 w-2 rounded-full bg-red-400'></div>
        <div className='h-2 w-2 rounded-full bg-yellow-400'></div>
      </div>
      <nav className='flex flex-col-reverse sm:flex-row justify-between items-end sm:items-start mb-10 px-2 md:px-5'>
        <div className='flex items-start w-full flex-col gap-2'>
          {isHomePage && (
            <>
              <h1>
                Welcome, guest@
                <span className='text-green-500'>terminal</span>
                :$~
              </h1>
              <p>Experience anime like never before.</p>
              <p>---</p>
              <p>Discover and watch anime with a minimalist touch.</p>
              <p>---</p>
            </>
          )}
          {isWatchPage && (
            <>
              <Link to='/'>home</Link>/
            </>
          )}

          {isResultsPage && (
            <>
              <Link to='/'># Press Esc to go back</Link>
              <p> # Use arrow keys ↑ and ↓ to navigate</p>
            </>
          )}

          {isEpisodesPage && (
            <>
              <Link to='/'># Press Esc to go back</Link>
              <p> # Use arrow keys ↑ and ↓ to navigate</p>
              <p> # Press space to find a specific episode</p>
            </>
          )}
        </div>
        <ModeToggle />
      </nav>
    </>
  )
}
