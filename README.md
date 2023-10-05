# Qxperts Training App

## How to use the app

1. Install node (with `asdf` if you are a chad)
2. Install packages `npm install` from the root
3. Setup your environment by copying the `.env.example` to `.env`
4. Generate the required `NEXTAUTH_SECRET` and populate the `.env` file. You can generate a secret with `openssl rand -base64 32`
5. Generate prisma schemas `npm run db:generate`
6. Run migrations `npm run db:push`
7. Start the app `npm run dev`. Can be run from root, app workspace or any test project

## Connecting to spotify

1. Login / Sign up to the [Spotify Developer Console](https://developer.spotify.com/)
2. Create an App in [Spotify Dashboard](https://developer.spotify.com/dashboard/applications)
3. Edit settings and add a redirect url to

    ```url
    http://localhost:3000/api/auth/callback/spotify
    ```

4. Copy client ID an secret to your env file (in tabtracker)
