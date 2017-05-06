import SpotifyWebApi from 'spotify-web-api-node'
import clientConfig from '../../config/client'

const scopes = ['user-follow-read']
const state = 'my state'

export function getUrl () {
  const spotifyApi = new SpotifyWebApi(clientConfig)

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)

  return authorizeURL
}
