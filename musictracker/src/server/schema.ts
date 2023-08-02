import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const playlists = sqliteTable('playlists', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull()
})