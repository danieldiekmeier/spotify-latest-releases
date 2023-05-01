<script>
  import Filters from './Filters.svelte'
  import Album from './Album.svelte'

  export let albums = []
  export let filters = { album: true, single: false }

  $: mappedAlbums = albums.filter((album) => filters[album.album_type])
</script>

<div>
  <Filters bind:filters />

  <div class="Albums">
    {#each mappedAlbums as album}
      {#key album.id}
        <Album {album} />
      {/key}
    {/each}
  </div>
</div>

<style>
  .Albums {
    display: grid;
    grid-template-columns: auto;
    grid-gap: 1em;
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
