import { ModeToggle } from './mode-toggle'

export default function Nav() {
  return (
    <nav className='flex justify-between container mt-10'>
      <h1 aria-label='Terminal Portfolio'>
        visitor@terminal.satnaing.dev:~$welcome
      </h1>
      <ModeToggle />
    </nav>
  )
}
