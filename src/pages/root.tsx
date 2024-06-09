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
        <p>For a list of available commands, type `help`.</p>
        <p>----</p>
        <div className='flex items-center'>
          <p>
            visitor@
            <span className='text-red-500'>terminal.satnaing.dev</span>
            :~$
          </p>
          <Input
            ref={inputRef}
            autoFocus
            className='w-fit'
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  )
}
