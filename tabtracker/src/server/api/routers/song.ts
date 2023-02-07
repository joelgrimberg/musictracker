import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  protectedSpotifyProcedure,
  publicProcedure,
} from '../trpc'

export const songRouter = createTRPCRouter({
  getAllSongs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.song.findMany()
  }),
  searchTrack: protectedSpotifyProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return (await ctx.spotify.search(input, ['track'])).body
    }),
  addTrack: protectedProcedure
    .input(
      z.object({
        spotifyId: z.string(),
        title: z.string(),
        artist: z.string(),
        coverUrl: z.string().url(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.song.create({ data: input })
    }),
  removeTrack: protectedProcedure
    .input(
      z.object({
        uuid: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.song.delete({ where: { uuid: input.uuid } })
    }),
})
