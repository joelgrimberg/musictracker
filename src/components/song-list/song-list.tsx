import type { FunctionComponent } from "react";
import { api } from "../../utils/api";

export const SongList: FunctionComponent = () => {
  const { data: songs } = api.song.getAllSongs.useQuery()

  return (
    <div className="flex flex-col text-white gap-4 ">
      {songs && songs.map(({ title, uuid, coverUrl }) => (
        <div className="bg-white/20 p-4 rounded" key={uuid}><h2 >{title}</h2><img src={coverUrl}></img></div>
      ))}
    </div>
  );
};
