import { z } from "zod";

import { createTRPCRouter, protectedProcedure, protectedSpotifyProcedure, publicProcedure } from "../trpc";

export const songRouter = createTRPCRouter({

    getAllSongs: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.song.findMany()
    }),
    createSong: publicProcedure.input(z.object({
        title: z.string(),
        artist: z.string(),
        coverUrl: z.string().url()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.song.create({ data: input })
    }),
    searchTrack: protectedSpotifyProcedure.input(z.string()).query(async ({ input, ctx }) => {
        return (await ctx.spotify.search(input, ['track'])).body
    }),
    addTrack: protectedProcedure.input(z.object({
        spotifyId: z.string(),
        title: z.string(),
        artist: z.string(),
        coverUrl: z.string().url()
    })).mutation(({ctx, input}) => {
        return ctx.prisma.song.create({ data: input })
    }),
});
