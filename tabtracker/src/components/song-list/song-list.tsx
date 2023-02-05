import type { FunctionComponent } from "react";
import { api } from "../../utils/api";
import Image from 'next/image'
import { useRouter } from "next/router";
import type { FormEventHandler} from "react";
import { Layout } from "../layout/layout";

export const SongList: FunctionComponent = () => {
  const { data: songs } = api.song.getAllSongs.useQuery()
  const { push } = useRouter();
  const spotifyImageLoader = ({ src , width, quality = 75 }: {src: string, width: number | undefined, quality?: number}) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  }

  const { mutate, isLoading } = api.song.removeTrack.useMutation({onSuccess: () => push("/")});
  const removeTrack = ( uuid: string ) => {
    //const addTrack = (data: { title: string; artist: string; coverUrl: string; spotifyId: string; }) => {
    return () => {
      console.log(uuid)
      mutate(uuid)
    }
  }


  return (
      <Layout>
    <div className="grid gap-4 rounded-xl sm:grid-cols-4 md:gap-8 bg-white/10 p-4 text-white">
      {songs && songs.map(({ title, uuid, coverUrl }) => (
        <form onSubmit={onSubmit} key={uuid} className="flex flex-col gap-4">
          <input type="hidden" name="songId" value={uuid} />
        <div
          key={uuid}
          className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 hover: cursor-pointer group">

          <h2 >{title}

          <button disabled={isLoading} onClick={removeTrack({uuid})} type="submit">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hidden hover:bg-white/20 group-hover:inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
          </h2>


          <br />

          <Image
            loader={spotifyImageLoader}
            src={coverUrl}
            alt={`album art for ${title}`}
            width={200}
            height={200}
          />
          <button type="submit">Search</button>
        </div>
        </form>
      ))}
    </div>
      </Layout>
  );
};


