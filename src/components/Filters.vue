<style lang="stylus">
  .Filters {
    padding-top 2em
    text-align center

    label {
      display inline-block
      margin-left 1em
      margin-right 1em
    }

    input {
      margin-right 0.25em
    }
  }
</style>

<template>
  <div class="Filters">
    <label>
      <input type="checkbox" value="album" v-model="filters" />
      Albums
    </label>

    <label>
      <input type="checkbox" value="single" v-model="filters" />
      Singles
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Filters',

    props: {
      value: {
        type: Array
      }
    },

    computed: {
      filters: {
        get () {
          return this.value
        },

        set (next) {
          return this.$emit('input', next)
        }
      }
    }
  }
</script>
