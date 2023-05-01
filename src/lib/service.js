function Api(token) {
  async function load(baseUrl, params) {
    // We'll retry until we're successful,
    // or until we get an error that's not 429

    try {
      const url = new URL(baseUrl)

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) return
        url.searchParams.append(key, value)
      })

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (err) {
      if (err.response?.status === 429) {
        // If Spotify wants us to wait, we'll wait.
        await wait(err.response.headers['Retry-After'])
        return await load(url, params)
      } else {
        throw err
      }
    }
  }

  return {
    getFollowedArtists(params) {
      return load('https://api.spotify.com/v1/me/following', {
        ...params,
        type: 'artist',
      })
    },

    getArtistAlbums(artistId, params) {
      return load(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        params
      )
    },

    getAlbums(albumIds) {
      return load(`https://api.spotify.com/v1/albums`, {
        ids: albumIds.join(','),
      })
    },
  }
}

function wait(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000)
  })
}

export default function Service(TOKEN) {
  const spotifyApi = Api(TOKEN)

  async function getFollowedArtists(after) {
    const limit = 50

    const data = await spotifyApi.getFollowedArtists({ limit, after })

    const nextAfter = data.artists.cursors.after
    const artists = data.artists.items

    if (nextAfter) {
      return [].concat(artists, await getFollowedArtists(nextAfter))
    } else {
      return artists
    }
  }

  async function getAlbums(artists) {
    const allAlbumsDataArray = await Promise.all(
      artists.map((artist) => {
        return spotifyApi.getArtistAlbums(artist.id, {
          limit: 5,
          album_type: 'album,single',
          country: 'DE',
        })
      })
    )

    const allAlbums = allAlbumsDataArray.flatMap((data) => data.items)

    return allAlbums
  }

  function transformAlbums(albums) {
    return albums.map((album) => {
      const index = Math.min(2, album.images.length) - 1

      return {
        album_type: album.album_type,
        artists: album.artists.map((artist) => artist.name).join(', '),
        external_urls: album.external_urls,
        href: album.href,
        id: album.id,
        cover: album.images[index].url,
        name: album.name,
        release_date: album.release_date,
        date: new Date(album.release_date).toLocaleDateString('de-DE'),
      }
    })
  }

  function orderAlbums(albums) {
    return albums.sort((a, b) => b.release_date.localeCompare(a.release_date))
  }

  return {
    getFollowedArtists,
    getAlbums,
    transformAlbums,
    orderAlbums,
  }
}
