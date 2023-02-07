import type { FunctionComponent} from "react";
import { api } from "../../utils/api";
import Image from "next/image";
import { useRouter } from "next/router";

export const SongList: FunctionComponent = () => {
  const { data: songs } = api.song.getAllSongs.useQuery();
  const { push } = useRouter();
  const spotifyImageLoader = ({
    src,
    width,
    quality = 75,
  }: {
    src: string;
    width: number | undefined;
    quality?: number;
  }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const { mutate: removeTrack, isLoading } = api.song.removeTrack.useMutation({
    onSuccess: () => push("/"),
  });

  return (
    <div className="grid grid-cols-2 gap-4 rounded-xl bg-white/10 p-4 text-white sm:grid-cols-4 md:gap-8">
      {songs && songs.length
        ? ""
        : "quickly add your first song so I can show it here 🥳"}
      {songs &&
        songs.map(({ title, uuid, coverUrl }) => (
          <div
            key={uuid}
            className="hover: group cursor-pointer rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 "
          >
            <div className="mb-2 grid grid-flow-col align-middle">
              <h2 className="leading-6">{title}</h2>
              <button
                disabled={isLoading}
                onClick={() => removeTrack({ uuid })}
                type="submit"
                className="flex justify-end align-middle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 hover:bg-white/20 group-hover:inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>

            <Image
              loader={spotifyImageLoader}
              priority
              src={coverUrl}
              alt={`album art for ${title}`}
              width={300}
              height={300}
            />
          </div>
        ))}
    </div>
  );
};
