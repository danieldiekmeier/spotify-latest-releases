# Spotify Latest Releases

### Go to [spotify.danieldiekmeier.de](https://spotify.danieldiekmeier.de/) to try it yourself!

List the latest albums of your followed artists in chronological order.

![Screenshot](https://raw.githubusercontent.com/danieldiekmeier/spotify-latest-releases/main/screenshot.jpg)

## Installation

You can install this on your own server, if you want.

Before you start, you should register an application with Spotify, by going here: https://developer.spotify.com/dashboard. This is where you get your `clientId` and `clientSecret`, and where you have to enter your `redirectUri`.

1. Clone
2. Run `pnpm i` (or `npm i`) to install the dependencies
3. You have to pass these three environment variables to the app:

```env
PUBLIC_CLIENT_ID=YOUR_CLIENT_ID
PUBLIC_REDIRECT_URI=http://localhost:5173/callback

CLIENT_SECRET=YOUR_CLIENT_SECRET

SESSION_SECRET=YOUR_SESSION_SECRET # needs to be exactly 32 characters long
```

(The easiest way to do this locally is to create a `.env.local` file in the root of the project.)

4. Run `pnpm build` to build the SvelteKit app
5. Run `node build`
6. Go to `localhost:3000` to see the app. (You can change the port by setting the `PORT` environment variable.)
