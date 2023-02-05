import { z } from "zod";

import { createTRPCRouter, protectedProcedure, protectedSpotifyProcedure, publicProcedure } from "../trpc";

export const playlistRouter = createTRPCRouter({

    getAllPlaylists: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.playlist.findMany()
    }),
    searchPlaylist: protectedSpotifyProcedure.input(z.string()).query(async ({ input, ctx }) => {
        return (await ctx.spotify.search(input, ['playlist'])).body
    }),
    addPlaylist: protectedProcedure.input(z.object({
        spotifyId: z.string(),
        playlistId: z.string(),
        title: z.string(),
        song: z.string(),
    })).mutation(({ctx, input}) => {
        return ctx.prisma.playlist.create({ data: input })
    }),
});
