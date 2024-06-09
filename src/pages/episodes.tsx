import LoaderText from '@/components/loader-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useEnterKeyPress,
  useEscapeKeyPress,
  useSpacebarKeyPress,
} from '@/hooks/enterKey'
import { getAnimeEpisodes, getAnimeStreamingLinks } from '@/lib/anime'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza'
import { MediaPlayer, MediaProvider, MediaSrc } from '@vidstack/react'
import { StreamEpisode } from '@/types/anime'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'

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

  return (
    <div>
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
      {isLoading && <LoaderText text='Episodes' />}

      {error && <p>Try again later.</p>}

      <div className='flex flex-col items-start'>
        {filteredData?.map((item, index) => (
          <Button
            // onClick={() => navigate(`/watch/${item.id}`)}
            onClick={() => {
              setModalOpen(true)
              setEpisodeId(item.id)
            }}
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
      <Modal
        episodeId={episodeId}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}

interface ModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  episodeId: string
}

function Modal({ modalOpen, setModalOpen, episodeId }: ModalProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['watch', episodeId],
    queryFn: () => getAnimeStreamingLinks(episodeId!),
  })

  const transformedUrls: MediaSrc[] = data?.sources?.map(
    (item: StreamEpisode) => {
      let width, height
      switch (item.quality) {
        case '360p':
          width = 640
          height = 360
          break
        case '480p':
          width = 854
          height = 480
          break
        case '720p':
          width = 1280
          height = 720
          break
        case '1080p':
          width = 1920
          height = 1080
          break
        default:
          width = height = null
      }

      return {
        src: item.url,
        type: 'application/x-mpegURL',
        width,
        height,
      }
    }
  )
  return (
    <Credenza open={modalOpen} onOpenChange={setModalOpen}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Credenza</CredenzaTitle>
          <CredenzaDescription>
            A responsive modal component for shadcn/ui.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {isLoading && <LoaderText text='Video' />}

          {error && <p>Try again later.</p>}

          {data?.sources && (
            <div className='aspect-video'>
              <MediaPlayer
                title='Sprite Fight'
                src={transformedUrls}
                load='eager'
                autoPlay={true}
              >
                <MediaProvider />
                <DefaultVideoLayout
                  // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                  icons={defaultLayoutIcons}
                />
              </MediaPlayer>
            </div>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <button>Close</button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}
