# Spotify Latest Releases

### Go to [spotify.danieldiekmeier.de](https://spotify.danieldiekmeier.de/) to try it yourself!

List the latest albums of your followed artists in chronological order.

![Screenshot](https://raw.githubusercontent.com/danieldiekmeier/spotify-latest-releases/master/screenshot.jpg)

## Installation

You can install this on your own server, if you want.

Before you start, you should register an application with Spotify, by going here: https://developer.spotify.com/my-applications/#!/applications. This is where you get your `clientId` and `clientSecret`, and where you have to enter your `redirectUri`.

1. Clone
2. Run `yarn` to install the dependencies
3. Create `config/index.js` and `config/client.js`, with following contents:

```js
// index.js
const clientConfig = require('./client')

module.exports = Object.assign({
  port: 5000,
  clientSecret: <client_secret>
}, clientConfig)
```

```js
// client.js
module.exports = {
  clientId: <client_id>,
  redirectUri: <your_redirect_url>
}
```

4. Run `yarn build`
5. Run `node src/app.js`
6. Go to `localhost:5000` to see the app.

Make sure you have Node >= 7.6 installed.
