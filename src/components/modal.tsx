import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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

interface ModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  episodeId: string
  episodeDetail: Episode | undefined
  animeId: string | undefined
}

export function Modal({
  modalOpen,
  setModalOpen,
  episodeId,
  episodeDetail,
  animeId,
}: ModalProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['watch', episodeId],
    queryFn: () => getAnimeStreamingLinks(episodeId!),
  })

  console.log(animeId)

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
  console.log(episodeDetail)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credenza</DialogTitle>
          <DialogDescription>Episode {episodeDetail?.number}</DialogDescription>
        </DialogHeader>
        <div>
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button>Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}