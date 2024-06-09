import Hero from '@/components/hero'
import { Input } from '@/components/ui/input'
import { useEnterKeyPress } from '@/hooks/enterKey'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Root() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEnterKeyPress(() => navigate(`/results/${query}`))

  return (
    <>
      <Hero />
      <div className='flex flex-col'>
        <div className='flex md:items-center flex-col md:flex-row'>
          <p className='hidden'>
            visitor@
            <span className='text-red-500'>terminal.satnaing.dev</span>
            :~$
          </p>
          <div className='flex items-center gap-2'>
            <p>
              visitor@
              <span className='text-green-500'>terminal</span>
              :~$
            </p>
            <Input
              ref={inputRef}
              autoFocus
              className='w-fit text-yellow-500'
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
