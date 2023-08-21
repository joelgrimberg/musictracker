import { client } from "@/client";
import { columns } from "@/components/tracklist/columns";
import { Tracklist } from "@/components/tracklist/tracklist";

export function Browse() {
  const { data, isLoading } = client.getAllMusicTracks.useQuery(["tracks"]);

  if (isLoading) return "Loading...";

  return (
    <div className="space-y-6">
      <Tracklist columns={columns} data={data?.body ?? []} />
    </div>
  );
}
