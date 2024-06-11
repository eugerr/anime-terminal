import { Input } from '@/components/ui/input'
import { useEnterKeyPress } from '@/hooks/enterKey'
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
      <div className='flex flex-col'>
        <div className='flex md:items-center flex-col sm:flex-row'>
          <p>
            anime@
            <span className='text-green-500'>terminal</span>
            :~$
          </p>
          <div className='flex items-center'>
            <p className='sm:hidden'>{`>`}</p>
            <Input
              ref={inputRef}
              autoFocus
              className='w-fit text-yellow-500 px-0'
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
