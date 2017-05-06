<style lang="stylus">
  .Albums {
    display grid
    grid-template-columns auto
    grid-gap 1em

    padding-top 2em
    padding-bottom 2em
  }
</style>

<template>
  <div v-if="albums.length">
    <v-filters v-model="filters" />

    <div class="Albums">
      <v-album
        v-for="album in mappedAlbums"
        :album="album"
        :key="album.id"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'AlbumList',

    components: {
      'v-filters': require('components/Filters'),
      'v-album': require('components/Album')
    },

    props: {
      albums: {
        type: Array
      }
    },

    data: () => ({
      filters: ['album']
    }),

    computed: {
      mappedAlbums () {
        return this.albums
          .filter(album => this.filters.includes(album.album_type))
          .map(_album => {
            const album = Object.assign({}, _album)

            album.artists = album.artists.map(artist => artist.name).join(', ')

            const index = Math.min(2, album.images.length) - 1
            album.cover = album.images[index].url

            album.date = moment(album.release_date).format('DD.MM.YYYY')

            return album
          })
      }
    }
  }
</script>
