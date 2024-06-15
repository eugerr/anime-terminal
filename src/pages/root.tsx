import { Input } from '@/components/ui/input'
import { useEnterKeyPress } from '@/hooks/enterKey'
import { siteConfig } from '@/lib/constants'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Root() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEnterKeyPress(() => navigate(`/results/${query}`))

  return (
    <>
      <div className='flex flex-col mt-2 md:mt-0'>
        <div className='flex md:items-center flex-col sm:flex-row'>
          <p>
            <span className='text-yellow-500'>{siteConfig.user}</span>@
            <span className='text-green-500'>{siteConfig.url}</span>:
            <span className='text-muted-foreground'>~$ </span>
          </p>
          <div className='flex items-center'>
            <p className='sm:hidden'>{`>`}</p>
            <Input
              ref={inputRef}
              autoFocus
              className='w-fit text-yellow-500 px-0 ml-2'
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
