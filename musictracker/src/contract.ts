
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const PlaylistSchema = z.object({
    id: z.number(),
    title: z.string(),
});

export const contract = c.router({
    createPlaylist: {
        method: 'POST',
        path: '/playlists',
        responses: {
            201: PlaylistSchema,
        },
        body: z.object({
            title: z.string()
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

    }
}, {pathPrefix: '/api'});