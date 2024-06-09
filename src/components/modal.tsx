import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
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
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

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
  setSelectedItemIndex,
  selectedItemIndex,
  isFirstEpisode,
  isLastEpisode,
}: ModalProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['watch', episodeId, selectedItemIndex],
    queryFn: () => getAnimeStreamingLinks(episodeId!),
  })

  const isDesktop = useMediaQuery('(min-width: 768px)')

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

  if (isDesktop) {
    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{epTitle}</DialogTitle>
          </DialogHeader>
          <div>
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
                <div
                  className={cn(
                    'flex justify-between mt-2',
                    isFirstEpisode && 'justify-end'
                  )}
                >
                  {!isFirstEpisode && (
                    <Button
                      variant='expandIcon'
                      Icon={ArrowLeftIcon}
                      iconPlacement='left'
                      onClick={() =>
                        setSelectedItemIndex(selectedItemIndex - 1)
                      }
                    >
                      Prev
                    </Button>
                  )}
                  {!isLastEpisode && (
                    <Button
                      variant='expandIcon'
                      Icon={ArrowRightIcon}
                      iconPlacement='right'
                      onClick={() =>
                        setSelectedItemIndex(selectedItemIndex + 1)
                      }
                    >
                      Next
                    </Button>
                  )}
                </div>

                <Alert className='mt-10' variant='destructive'>
                  <ExclamationTriangleIcon className='h-4 w-4' />
                  <AlertTitle>Video not playing?</AlertTitle>
                  <AlertDescription>
                    Try refreshing your browser or try again later
                  </AlertDescription>
                </Alert>
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
  return (
    <Drawer open={modalOpen} onOpenChange={setModalOpen}>
      <DrawerContent className='px-2'>
        <DrawerHeader>
          <DrawerTitle>{epTitle}</DrawerTitle>
        </DrawerHeader>
        <div>
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
              <div
                className={cn(
                  'flex justify-between mt-2',
                  isFirstEpisode && 'justify-end'
                )}
              >
                {!isFirstEpisode && (
                  <Button
                    variant='expandIcon'
                    Icon={ArrowLeftIcon}
                    iconPlacement='left'
                    onClick={() => setSelectedItemIndex(selectedItemIndex - 1)}
                  >
                    Prev
                  </Button>
                )}
                {!isLastEpisode && (
                  <Button
                    variant='expandIcon'
                    Icon={ArrowRightIcon}
                    iconPlacement='right'
                    onClick={() => setSelectedItemIndex(selectedItemIndex + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>

              <Alert className='my-5' variant='destructive'>
                <ExclamationTriangleIcon className='h-4 w-4' />
                <AlertTitle>Video not playing?</AlertTitle>
                <AlertDescription>
                  Try refreshing your browser or try again later
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
