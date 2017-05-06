import bluebird from 'bluebird'
import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'
import Qs from 'qs'

function unpackArray (datas, unpack) {
  return _.flatten(datas.map(unpack))
}

function unpackItem (body, key) {
  if (key) {
    return body[key].items
  } else {
    return body.items
  }
}

function Api (token) {
  const http = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    },

    paramsSerializer (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    }
  })

  async function load (url, options) {
    // We'll retry until we're successfull,
    // or until we get an error that's not 429

    while (false) {
      try {
        return await http.get(url, options)
      } catch (err) {
        if (err.response.status === 429) {
          // If Spotify wants us to wait, we'll wait.
          await wait(err.response.headers['Retry-After'])
        } else {
          throw err
        }
      }
    }
  }

  return {
    getFollowedArtists (_params) {
      const params = Object.assign({}, _params, { type: 'artist' })

      return load('https://api.spotify.com/v1/me/following', {
        params
      })
    },

    getArtistAlbums (artistId, _params) {
      const params = Object.assign({}, _params)

      return load(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        params
      })
    },

    getAlbums (albumIds) {
      return load(`https://api.spotify.com/v1/albums`, {
        params: {
          ids: albumIds.join(',')
        }
      })
    }
  }
}

function wait (s) {
  return new Promise (resolve => {
    setTimeout(resolve, s * 1000)
  })
}

export default function Service (TOKEN) {
  const spotifyApi = Api(TOKEN)

  async function getFollowedArtists (after) {
    const limit = 50

    const response = await spotifyApi.getFollowedArtists({ limit, after })

    const total = response.data.artists.total
    const nextAfter = response.data.artists.cursors.after
    const artists = response.data.artists.items

    if (nextAfter) {
      return [].concat(artists, await getFollowedArtists(nextAfter))
    } else {
      return artists
    }
  }

  async function getAlbumIds (artists) {
    const allAlbumsDataArray = await bluebird.map(artists, artist => {
      return spotifyApi.getArtistAlbums(artist.id, {
        limit: 5,
        album_type: 'album,single',
        country: 'DE'
      })
    })

    const allAlbums = unpackArray(allAlbumsDataArray, response => response.data.items)

    return allAlbums.map(album => album.id)
  }

  async function getAlbumInformation (albumIds) {
    const chunks = _.chunk(albumIds, 20)

    // returns [[body.albums.20 Albums], [body.albums.20 Albums]]
    const albumDataArray = await bluebird.map(chunks, albumIds => {
      return spotifyApi.getAlbums(albumIds)
    })

    // returns [[20 Albums], [20 Albums]]
    const albums = unpackArray(albumDataArray, response => response.data.albums)

    return albums
  }

  function transformAlbums (albums) {
    return albums.map(_album => {
      const album = _.pick(_album, [
        'album_type',
        'artists',
        'external_urls',
        'href',
        'id',
        'images',
        'name',
        'release_date'
      ])

      const formats = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY']

      album.release_date = moment.utc(album.release_date, formats).toDate()

      return album
    })
  }

  function orderAlbums (albums) {
    return _.orderBy(albums, ['release_date'], 'desc')
  }

  return {
    getFollowedArtists,
    getAlbumIds,
    getAlbumInformation,
    transformAlbums,
    orderAlbums
  }
}
