import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getAnimeStreamingLinks } from '@/lib/anime'
import { Episode, StreamEpisode } from '@/types/anime'
import { useQuery } from '@tanstack/react-query'
import { MediaPlayer, MediaProvider, MediaSrc } from '@vidstack/react'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'
import { Dispatch, SetStateAction } from 'react'
import LoaderText from './loader-text'
import { Skeleton } from './ui/skeleton'

interface ModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  episodeId: string
  episodeDetail: Episode | undefined
  selectedItemIndex: number
  setSelectedItemIndex: Dispatch<SetStateAction<number>>
  isFirstEpisode: boolean
  isLastEpisode: boolean
}

export function Modal({
  modalOpen,
  setModalOpen,
  episodeId,
  episodeDetail,
  selectedItemIndex,
  isFirstEpisode,
}: ModalProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['watch', episodeId, selectedItemIndex],
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
  console.log(isFirstEpisode)

  const epTitle = episodeDetail?.id
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className='p-0 bg-transparent'>
        {isLoading && (
          <>
            <LoaderText text='Video' />
            <Skeleton className='h-[45vh]' />
          </>
        )}

        {error && <p>Try again later.</p>}

        {data?.sources && (
          <div className='aspect-video'>
            <MediaPlayer
              title={epTitle}
              src={transformedUrls}
              load='eager'
              autoPlay={true}
              poster={episodeDetail?.image}
              playsInline={true}
            >
              <MediaProvider />
              <DefaultVideoLayout
                // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
