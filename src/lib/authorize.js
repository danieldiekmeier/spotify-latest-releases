import { env } from '$env/dynamic/public'

const scopes = ['user-follow-read']
const state = 'some-state-of-my-choice'

export function getUrl() {
  const url = new URL('https://accounts.spotify.com/authorize')
  url.searchParams.append('client_id', env.PUBLIC_CLIENT_ID)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', env.PUBLIC_REDIRECT_URI)
  url.searchParams.append('scope', scopes.join(' '))
  url.searchParams.append('state', state)

  return url.toString()
}
