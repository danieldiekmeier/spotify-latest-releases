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

    h2 {
      margin-bottom 0.5em
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
      <h2>{{ album.name }}</h2>
      <p>{{ album.artists }}</p>
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
