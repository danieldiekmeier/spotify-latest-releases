import SpotifyWebApi from 'spotify-web-api-node'
import bluebird from 'bluebird'
import moment from 'moment'
import _ from 'lodash'

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

// Create the authorization URL

export default function Service (TOKEN) {
  const spotifyApi = new SpotifyWebApi()

  spotifyApi.setAccessToken(TOKEN)

  async function getFollowedArtists (after) {
    const limit = 50

    const data = await spotifyApi.getFollowedArtists({ limit, after })
    const total = data.body.artists.total
    const nextAfter = data.body.artists.cursors.after

    const artists = data.body.artists.items

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
        album_type: ['album', 'single'],
        country: 'DE'
      })
    })

    const allAlbums = unpackArray(allAlbumsDataArray, data => data.body.items)

    return allAlbums.map(album => album.id)
  }

  async function getAlbumInformation (albumIds) {
    const chunks = _.chunk(albumIds, 20)

    // returns [[body.albums.20 Albums], [body.albums.20 Albums]]
    const albumDataArray = await bluebird.map(chunks, albumIds => {
      return spotifyApi.getAlbums(albumIds)
    })

    // // returns [[20 Albums], [20 Albums]]
    const albums = unpackArray(albumDataArray, data => data.body.albums)

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
