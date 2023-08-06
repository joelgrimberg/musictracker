import { createExpressEndpoints, initServer } from "@ts-rest/express";
import bodyParser from "body-parser";
import express from "express";
import { contract } from "../contract";
import ViteExpress from "vite-express";
import db from "./db";
import { playlists } from "./schema";
import { eq } from "drizzle-orm";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  getPlaylist: async ({ params: { id } }) => {
    if (!Number.isInteger(+id)) return { status: 400, body: { message: 'Invalid request, id should be a number' } };

    const playlist = db.select().from(playlists).where(eq(playlists.id, +id)).get()
    if (!playlist) return { status: 404, body: { message: `Playlist ${id} not found` } }

    return { status: 200, body: playlist }
  },
  getPlaylists: async () => {
    const result = db.select().from(playlists).all()
    return {
      status: 200, body: result
    }
  },
  createPlaylist: async ({ body: playlist }) => {
    const created = db.insert(playlists).values(playlist).returning({ id: playlists.id, name: playlists.name }).get()
    return { status: 201, body: created }
  }
});

createExpressEndpoints(contract, router, app);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
