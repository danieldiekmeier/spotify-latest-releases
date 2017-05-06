<style lang="stylus">
  .NoToken {
    display flex
    width 100%
    height 100%
    min-height 100vh

    align-items center
    justify-content center

    h2 {
      margin-bottom 1rem
    }
  }

  .NoToken-content {
    text-align center
  }

  .NoToken-button {
    margin-bottom 1rem

    padding 1em
    padding-left 2em
    padding-right 2em

    border 0
    border-radius 200px
    outline 0
    background-color green

    color inherit
    font-family inherit
    font-size inherit
    font-weight bold
    text-transform uppercase

    cursor pointer

    transition-duration 0.2s
    transition-property background-color box-shadow

    &:hover {
      background-color darken(green, 10%)
    }

    &:focus {
      box-shadow 0 0 30px rgba(lighten(green, 30%), 0.5)
    }
  }
</style>

<template>
  <div class="NoToken">
    <div class="NoToken-content">
      <h2>
        See the latest releases<br>
        of your followed bands
      </h2>

      <div>
        <button
          class="NoToken-button"
          @click="start"
        >
          Connect with Spotify
        </button>
      </div>

      <small>
        This website is in no way affiliated with Spotify.
      </small>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoToken',

    methods: {
      start () {
        this.$emit('start')
      }
    }
  }
</script>
