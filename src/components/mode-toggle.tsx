import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  function click() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <Button
      className='absolute right-2 top-2'
      onClick={click}
      variant='ghost'
      size='icon'
    >
      <SunIcon className='size-4 md:size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute size-4 md:size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
