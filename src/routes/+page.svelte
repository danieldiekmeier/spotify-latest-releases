<script>
  import NoToken from '../components/NoToken.svelte'
  import AlbumList from '../components/AlbumList.svelte'
  import Loading from '../components/Loading.svelte'

  export let data
</script>

{#if !data.token}
  <NoToken />
{:else}
  {#await data.later.albums}
    <Loading>Fetching albums …</Loading>
  {:then albums}
    <AlbumList {albums} />
  {:catch error}
    <p>error: {error.message}</p>
  {/await}
{/if}
