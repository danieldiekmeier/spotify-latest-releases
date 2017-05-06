<style lang="stylus">
  .Loading {
    padding-top 2em
    padding-bottom 2em
  }

  .Spinner {
    display inline-block
    height 1em
    width 1em

    top 2px
    margin-right 0.5em

    background-color green

    animation-name spin
    animation-duration 1s
    animation-iteration-count infinite
  }

  @keyframes spin {
    from {
      transform rotate(0deg)
    }

    to {
      transform rotate(270deg)
    }
  }
</style>

<template>
  <div class="Loading">
    <div class="Spinner"></div>

    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Loading',
  }
</script>
