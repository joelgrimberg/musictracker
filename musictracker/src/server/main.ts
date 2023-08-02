import { createExpressEndpoints, initServer } from "@ts-rest/express";
import bodyParser from "body-parser";
import express from "express";
import { contract } from "../contract";
import ViteExpress from "vite-express";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  getPlaylist: async () => {
    return { status: 200, body: { id: '1', title: 'a' } }
  },
  getPlaylists: async () => {
    return {
      status: 200, body: []
    }
  },
  createPlaylist: async () => {
    return { status: 201, body: { id: '1', title: 'created' } }
  }
});

createExpressEndpoints(contract, router, app);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
