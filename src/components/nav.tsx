import { siteConfig } from '@/lib/constants'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const isWatchPage = location.pathname.includes('/watch')
  const isResultsPage = location.pathname.includes('/results')
  const isEpisodesPage = location.pathname.includes('/episodes')

  const greeting =
    new Date().getHours() < 12
      ? 'good morning'
      : new Date().getHours() < 18
      ? 'good afternoon'
      : 'good evening'

  return (
    <nav className='flex flex-col-reverse sm:flex-row justify-between items-end sm:items-start px-2 md:px-5 gap-10'>
      <div className='flex items-start w-full flex-col gap-2'>
        {isHomePage && (
          <div className='space-y-2'>
            <p>
              <span className='text-yellow-500'>{siteConfig.user}</span>@
              <span className='text-green-500'>{siteConfig.url}</span>:
              <p className='sm:inline-block'>
                <span className='text-muted-foreground'>~$ </span>
                {greeting}
              </p>
            </p>
            <ASCII />
            <p>
              Simple anime streaming powered by{' '}
              <a
                href='https://github.com/consumet/api.consumet.org'
                target='_blank'
                className='text-blue-500 underline'
              >
                consumet
              </a>
              .
            </p>
            <p>
              No idea what to watch ? Type "
              <span className='font-bold'>random , top-rated , trending</span>".
            </p>
          </div>
        )}
        {isWatchPage && (
          <>
            <Link to='/'>home</Link>/
          </>
        )}

        {isResultsPage && !location.pathname.includes('help') && (
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
    </nav>
  )
}

function ASCII() {
  return (
    <pre className='text-xs'>
      <code>{`
 ⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
            `}</code>
    </pre>
  )
}
