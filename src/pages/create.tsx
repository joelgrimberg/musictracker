import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEventHandler} from "react";
import { useState } from "react";
import { Layout } from "../components/layout/layout";
import { api } from "../utils/api";

const CreateSongPage: NextPage = () => {
  const { push } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults } = api.song.searchTrack.useQuery(
    searchQuery,
    { enabled: searchQuery !== "" }
  );
  const onSubmit: FormEventHandler = (event) => {
    console.log("submitt");
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setSearchQuery((event.target as any).search.value);
    console.log(event);
  };

  const { mutate, isLoading } = api.song.addTrack.useMutation({onSuccess: () => push("/")});
  const addTrack = (data: { title: string; artist: string; coverUrl: string; spotifyId: string; }) => {
    return () => { 
      mutate(data)
    }
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input name="search" placeholder="Search by title, artist, whatever" />
        {/* <input name="artist" placeholder="artist" /> */}
        {/* <input name="coverUrl" placeholder="Cover URL" /> */}
        <button type="submit">Search</button>
        <ul className="text-white">
          {searchResults &&
            searchResults.tracks?.items.map((item) => (
              <li key={item.id}>
                {item.name} -{" "}
                {item.artists.map((artist) => artist.name).join(" ")}
                <button className="px-4 text-pink-300" disabled={isLoading} onClick={addTrack({
                  title: item.name,
                  artist: item.artists.map((artist) => artist.name).join(" "),
                  coverUrl: item.album.images[0]?.url || 'https://picsum.photos/200/200',
                  spotifyId: item.id,
                })}>Add this song!</button>
              </li>
            ))}
        </ul>
      </form>
    </Layout>
  );
};

export default CreateSongPage;
