import { ModeToggle } from './mode-toggle'
import { Link, useLocation } from 'react-router-dom'
export default function Nav() {
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const isWatchPage = location.pathname.includes('/watch')
  const isResultsPage = location.pathname.includes('/results')
  const isEpisodesPage = location.pathname.includes('/episodes')
  return (
    <nav className='flex flex-col-reverse sm:flex-row justify-between items-end sm:items-center container my-10 font-mono text-xs md:text-sm lg:text-base'>
      <div className='flex items-start w-full flex-col gap-2'>
        {isHomePage && (
          <h1>
            anime@
            <span className='text-green-500'>terminal</span>
            :~$ <span className='text-yellow-500'>welcome</span>
          </h1>
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
  )
}
