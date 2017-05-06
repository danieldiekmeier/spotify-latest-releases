<style lang="stylus">
  * {
    margin 0
    padding 0
    box-sizing border-box
    position relative
  }

  body {
    background-color #222
    color white
    font-family sans-serif
  }

  .App {
    width 100%
    max-width 800px
    margin-left auto
    margin-right auto
    padding-left 1em
    padding-right 1em
  }
</style>

<template>
  <div class="App">
    <v-no-token
      v-if="!token"
      @start="getToken"
    />

    <v-loading v-if="loading">
      {{state}}
    </v-loading>

    <v-album-list :albums="albums" />
  </div>
</template>

<script>
  import Service from '../lib/service'
  import * as Authorize from '../lib/authorize'

  function getCookieValue (a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)')
    return b ? b.pop() : null
  }

  export default {
    name: 'App',

    components: {
      'v-no-token': require('components/NoToken'),
      'v-loading': require('components/Loading'),
      'v-album-list': require('components/AlbumList')
    },

    data: () => ({
      loading: false,
      state: null,
      token: getCookieValue('token'),
      albums: []
    }),

    async mounted () {
      try {
        if (this.token) {
          await this.load()
        }
      } catch (err) {
        if (err.name === 'WebapiError' && err.statusCode === 401) {
          this.token = null
        } else {
          throw err
        }
      }
    },

    methods: {
      getToken () {
        window.location.href = Authorize.getUrl()
      },

      async load () {
        this.loading = true

        const service = Service(this.token)

        this.state = 'Loading all your artists'
        const artists = await service.getFollowedArtists()

        this.state = `Loading the latest albums of your ${artists.length} artists`
        const albumIds = await service.getAlbumIds(artists)

        this.state = `Loading the dates of ${albumIds.length} albums`
        const albums = await service.getAlbumInformation(albumIds)

        this.state = 'Almost done'
        const realAlbums = service.transformAlbums(albums)

        const orderedAlbums = service.orderAlbums(realAlbums)

        this.state = null
        this.albums = orderedAlbums
        this.loading = false
      }
    }
  }
</script>
