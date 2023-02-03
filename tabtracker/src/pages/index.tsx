import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { createInnerTRPCContext } from "../server/api/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/api/root";
import { SongList } from "../components/song-list/song-list";
import superjson from "superjson";
import { Layout } from "../components/layout/layout";

export const getServerSideProps: GetServerSideProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  await ssg.song.getAllSongs.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
const Home: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/create"
        >
          <h3 className="text-2xl font-bold">Add a new song</h3>
          <div className="text-lg">
            Track the tabs of a new song from your favorite music source
          </div>
        </Link>
      </div>
      <SongList />
      <div className="flex flex-col items-center gap-2">
        <AuthShowcase />
      </div>
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData} = useSession();
  
  console.log(sessionData)
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
