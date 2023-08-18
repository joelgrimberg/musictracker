import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TrackSources } from "../contract";

export const playlists = sqliteTable('playlists', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull()
})

export const tracks = sqliteTable('tracks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    source: text('source', { enum: [TrackSources.Spotify, TrackSources.YouTube] }).notNull(),
    title: text('title').notNull(),
    artist: text('artist'),
    url: text('url').notNull(),
    coverUrl: text('cover_url'),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
})
