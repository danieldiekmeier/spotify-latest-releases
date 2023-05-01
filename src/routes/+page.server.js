import Service from '$lib/service.js'

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
  const token = locals.session.data.token

  if (!token) {
    return { token: false }
  }

  try {
    const service = Service(token)
    const artists = await service.getFollowedArtists()

    return {
      token: true,
      later: {
        albums: loadAlbums(service, artists),
      },
    }
  } catch (error) {
    console.error(error)
    await locals.session.destroy()
    return { token: false }
  }
}

async function loadAlbums(service, artists) {
  const rawAlbums = await service.getAlbums(artists)
  const realAlbums = service.transformAlbums(rawAlbums)
  const orderedAlbums = service.orderAlbums(realAlbums)

  return orderedAlbums
}

export const actions = {
  async logout({ locals }) {
    await locals.session.destroy()
  },
}
