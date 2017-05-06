<style lang="stylus">
  .Album {
    display grid
    grid-template-columns 10em auto
    grid-column-gap 1em

    color inherit
    text-decoration none

    background-color rgba(#fff, 0.05)
  }

  .Album-cover {
    width 100%
  }

  .Album-content {
    display flex
    flex-direction column
    justify-content center

    h3 {
      margin-bottom 0rem
    }

    h2 {
      margin-bottom 0.5rem
    }

    p {
      margin-bottom 0.5rem
      text-transform capitalize
    }
  }
</style>

<template>
  <a
    class="Album"
    :href="album.external_urls.spotify"
    target="_blank"
  >
    <img
      class="Album-cover"
      :src="album.cover"
    />

    <div class="Album-content">
      <h3>{{ album.artists }}</h3>
      <h2>{{ album.name }}</h2>
      <p>{{ album.album_type }}</p>
      <p>{{ album.date }}</p>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'Album',

    props: {
      album: {
        type: Object
      }
    },

    methods: {
      concatArtists (artists) {
        return artists.map(artist => artist.name).join(', ')
      },

      getCover (album) {
        const index = Math.min(2, album.images.length) - 1
        return album.images[index].url
      }
    }
  }
</script>
