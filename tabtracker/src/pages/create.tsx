import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { FormEventHandler } from 'react'
import { useState, useCallback } from 'react'
import { Layout } from '../components/layout/layout'
import { api } from '../utils/api'

const CreateSongPage: NextPage = () => {
  const { push } = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: searchResults } = api.song.searchTrack.useQuery(searchQuery, {
    enabled: searchQuery !== '',
  })
  const { mutate: addTrack, isLoading } = api.song.addTrack.useMutation({
    onSuccess: () => push('/'),
  })

  const onSubmit: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault()
      setSearchQuery(
        (
          (event.target as HTMLFormElement).elements.namedItem(
            'search'
          ) as HTMLInputElement
        ).value
      )
    },
    [setSearchQuery]
  )

  const onAddSpotifyTrack = useCallback(
    (item: SpotifyApi.TrackObjectFull) => {
      addTrack({
        title: item.name,
        artist: item.artists.map((artist) => artist.name).join(' '),
        coverUrl: item.album.images[0]?.url || 'https://picsum.photos/200/200',
        spotifyId: item.id,
      })
    },
    [addTrack]
  )

  return (
    <Layout>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input name="search" placeholder="Search by title, artist, whatever" />
        <button type="submit">Search</button>
        <ul className="text-white">
          {searchResults &&
            searchResults.tracks?.items.map((item) => (
              <li key={item.id}>
                {item.name} -{' '}
                {item.artists.map((artist) => artist.name).join(' ')}
                <button
                  className="px-4 text-pink-300"
                  disabled={isLoading}
                  onClick={() => onAddSpotifyTrack(item)}
                >
                  Add this song!
                </button>
              </li>
            ))}
        </ul>
      </form>
    </Layout>
  )
}

export default CreateSongPage
