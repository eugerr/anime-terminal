import { Helmet } from 'react-helmet'
import LoaderText from '@/components/loader-text'
import { Input } from '@/components/ui/input'
import {
  useEnterKeyPress,
  useEscapeKeyPress,
  useSpacebarKeyPress,
} from '@/hooks/enterKey'
import { getAnimeEpisodes } from '@/lib/anime'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Modal } from '@/components/modal'

export default function Info() {
  const { id } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [episodeId, setEpisodeId] = useState<string>('')

  const { data, error, isLoading } = useQuery({
    queryKey: ['info', id],
    queryFn: () => getAnimeEpisodes(id!),
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!data) return

      switch (event.key) {
        case 'ArrowUp':
          setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          break
        case 'ArrowDown':
          setSelectedItemIndex((prevIndex) =>
            Math.min(prevIndex + 1, data.length - 1)
          )
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [data])

  useEscapeKeyPress(() => {
    // default behavior for modal
    if (modalOpen) {
      return
    }
    setSelectedItemIndex(-1) // Reset selection when Escape key is pressed
    navigate(-1)
  })

  useEnterKeyPress(() => {
    const selectedEpisode = filteredData?.[selectedItemIndex]
    if (selectedEpisode) {
      setEpisodeId(selectedEpisode.id)
    }
    setModalOpen(true)
  })

  useSpacebarKeyPress(() => {
    inputRef.current?.focus()
  })

  const filteredData = data?.filter(
    (item) =>
      item.number.toString().includes(searchQuery) ||
      item.number === selectedItemIndex
  )

  const isFirstEpisode = selectedItemIndex === 0
  const isLastEpisode = selectedItemIndex === (filteredData?.length || 0) - 1

  return (
    <div>
      <Helmet>
        <title>{filteredData?.[selectedItemIndex].title}</title>
      </Helmet>
      {!isLoading && (
        <Input
          ref={inputRef}
          className='w-fit border border-input mb-5'
          type='number'
          placeholder='Search by number...'
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value.trim()
            if (!isNaN(Number(value))) {
              setSearchQuery(value)
            }
          }}
        />
      )}
      {isLoading && <LoaderText text='Episodes' />}
      {error && <p>Try again later.</p>}
      {!filteredData?.length && !isLoading && <p>No episodes found.</p>}
      <div className='flex flex-col items-start'>
        {filteredData?.map((item, index) => (
          <Link
            to='#'
            onClick={() => {
              setModalOpen(true)
              setEpisodeId(item.id)
              setSelectedItemIndex(index)
            }}
            key={item.id}
            className={cn(
              index === selectedItemIndex && 'underline hover:after:scale-x-0',
              'hover:underline'
            )}
          >
            Episode {item.number} {item.title && ` - ${item.title}`}{' '}
            {item.description && ` - ${item.description}`}
          </Link>
        ))}
      </div>
      <Modal
        isFirstEpisode={isFirstEpisode}
        isLastEpisode={isLastEpisode}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
        episodeDetail={filteredData?.[selectedItemIndex]}
        episodeId={episodeId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
