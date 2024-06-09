import { ModeToggle } from './mode-toggle'
import { Link, useLocation } from 'react-router-dom'
export default function Nav() {
  const location = useLocation()

  const isWatchPage = location.pathname.includes('/watch')
  const isResultsPage = location.pathname.includes('/results')
  const isEpisodesPage = location.pathname.includes('/episodes')
  return (
    <nav className='flex justify-between items-center container my-10 font-mono text-xs md:text-sm lg:text-base'>
      <div className='flex items-center gap-2'>
        {isWatchPage && (
          <>
            <Link to='/'>home</Link>/
          </>
        )}

        {isResultsPage && (
          <>
            <Link to='/'>Press Esc to go back</Link>/
            <p>Use arrow keys ↑ and ↓ to navigate</p>
          </>
        )}

        {isEpisodesPage && (
          <>
            <Link to='/'>Press Esc to go back</Link>/
            <p>Use arrow keys ↑ and ↓ to navigate</p>
          </>
        )}
      </div>
      <ModeToggle />
    </nav>
  )
}
