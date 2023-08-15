
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const PlaylistSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export enum TrackSources {
    Spotify = "spotify",
    YouTube = "youtube"
}
const TrackSource = z.nativeEnum(TrackSources);
const TrackSchema = z.object({
    id: z.number(),
    source: TrackSource,
    title: z.string(),
    artist: z.string().optional(),
    url: z.string().url(),
    /**
     * @type {string} - UTC timestamp in milliseconds
     */
    createdAt: z.string()
})

export const contract = c.router({
    createPlaylist: {
        method: 'POST',
        path: '/playlists',
        responses: {
            201: PlaylistSchema,
        },
        body: z.object({
            name: z.string()
        }),
        summary: 'Create a post',
    },
    getPlaylist: {
        method: 'GET',
        path: `/playlists/:id`,
        responses: {
            200: PlaylistSchema.nullable(),
            400: c.type<{ message: string }>(),
            404: c.type<{ message: string }>()
        },
        summary: 'Get a playlist by id',
    },
    getPlaylists: {
        method: 'GET',
        path: `/playlists`,
        responses: {
            200: z.array(PlaylistSchema.nullable()),
        },
        summary: 'Get a all playlist',

    },
    addMusicTrack: {
        method: 'POST',
        path: '/tracks',
        body: z.object({
            source: TrackSource,
            title: z.string(),
            artist: z.string().optional(),
            url: z.string().optional()
        }),
        responses: {
            201: TrackSchema,
            400: c.type<{ message: string }>()
        },
        summary: 'Add a music track to your collection'
    },
    getMetaForMedia: {
        method: 'GET',
        path: '/meta',
        query: z.object({
            source: TrackSource,
            url: z.string().url()
        }),
        responses: {
            200: z.object({
                title: z.string(),
                artist: z.string().optional()
            }),
            404: c.type<{ message: string }>()
        },
        summary: 'Get metadata for a specific media URL for a source'
    }
}, { pathPrefix: '/api' });