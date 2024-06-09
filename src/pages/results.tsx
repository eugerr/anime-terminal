import LoaderText from '@/components/loader-text'
import { Button } from '@/components/ui/button'
import { useEnterKeyPress, useEscapeKeyPress } from '@/hooks/enterKey'
import { searchAnime } from '@/lib/anime'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Results() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)

  const { data, error, isLoading } = useQuery({
    queryKey: ['results', id],
    queryFn: () => searchAnime(id!),
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!data || !data.results) return

      switch (event.key) {
        case 'ArrowUp':
          setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          break
        case 'ArrowDown':
          setSelectedItemIndex((prevIndex) =>
            Math.min(prevIndex + 1, data.results.length - 1)
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

  useEnterKeyPress(() =>
    navigate(`/episodes/${data?.results?.[selectedItemIndex].id}`)
  )

  return (
    <div>
      <h1>
        Search results for : <span className='text-green-500'>{id}</span>
      </h1>

      {isLoading && <LoaderText text={id} />}

      {error && <p>Try again later.</p>}

      {!isLoading && !data?.results.length ? (
        <p>No results found</p>
      ) : (
        <div className='flex flex-col items-start'>
          {data?.results.map((item, index) => (
            <Button
              variant='linkHover2'
              key={item.id}
              onClick={() => navigate(`/episodes/${item.id}`)}
              className={cn(
                index === selectedItemIndex
                  ? 'underline hover:after:scale-x-0'
                  : ''
              )}
            >
              {item.title.english || item.title.userPreferred}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
