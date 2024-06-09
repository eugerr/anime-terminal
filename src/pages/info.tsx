import { Button } from '@/components/ui/button'
import { useEnterKeyPress, useEscapeKeyPress } from '@/hooks/enterKey'
import { getAnimeEpisodes } from '@/lib/anime'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Info() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)

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
    setSelectedItemIndex(-1) // Reset selection when Escape key is pressed
    navigate(-1)
  })

  useEnterKeyPress(() => navigate(`/watch/${data?.[selectedItemIndex].id}`))

  return (
    <div>
      {isLoading && <p>loading...</p>}

      {error && <p>Try again later.</p>}

      <div className='flex flex-col items-start'>
        {data?.map((item, index) => (
          <Button
            onClick={() => navigate(`/watch/${item.id}`)}
            variant='linkHover2'
            key={item.id}
            className={cn(
              index === selectedItemIndex
                ? 'underline hover:after:scale-x-0'
                : ''
            )}
          >
            Episode {item.number} {item.title && ` - ${item.title}`}{' '}
            {item.description && ` - ${item.description}`}
          </Button>
        ))}
      </div>
    </div>
  )
}
