import Service from '$lib/service.js'

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
  const token = locals.session.data.token

  if (!token)
    return {
      token: false,
    }

  return {
    token: true,
    later: {
      albums: loadAlbums(token),
    },
  }
}

async function loadAlbums(token) {
  const service = Service(token)

  let state = 'Loading all your artists'
  const artists = await service.getFollowedArtists()

  state = `Loading the latest albums of your ${artists.length} artists`
  const rawAlbums = await service.getAlbums(artists)

  state = 'Almost done'
  const realAlbums = service.transformAlbums(rawAlbums)

  const orderedAlbums = service.orderAlbums(realAlbums)

  // state = null
  // albums = orderedAlbums
  // loading = false
  return orderedAlbums
}
