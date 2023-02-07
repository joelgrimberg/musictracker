import type { FunctionComponent } from 'react'
import { api } from '../../utils/api'
import Image from 'next/image'

export const SongList: FunctionComponent = () => {
  const { data: songs } = api.song.getAllSongs.useQuery()

  const spotifyImageLoader = ({
    src,
    width,
    quality = 75,
  }: {
    src: string
    width: number | undefined
    quality?: number
  }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className="flex flex-col gap-4 text-white ">
      {songs &&
        songs.map(({ title, uuid, coverUrl }) => (
          <div className="rounded bg-white/20 p-4" key={uuid}>
            <h2>{title}</h2>
            <Image
              loader={spotifyImageLoader}
              src={coverUrl}
              alt={`album art for ${title}`}
              width={200}
              height={200}
            />
          </div>
        ))}
    </div>
  )
}
