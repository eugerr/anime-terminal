import { getAnimeStreamingLinks } from '@/lib/anime'
import { useQuery } from '@tanstack/react-query'
import { MediaPlayer, MediaProvider, MediaSrc } from '@vidstack/react'
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'
import { useParams } from 'react-router-dom'

import { StreamEpisode } from '@/types/anime'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import '@vidstack/react/player/styles/default/theme.css'

export default function Watch() {
  const { id } = useParams()

  const { data, error, isLoading } = useQuery({
    queryKey: ['watch', id],
    queryFn: () => getAnimeStreamingLinks(id!),
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
    <div>
      {isLoading && <p>loading...</p>}

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
  )
}
