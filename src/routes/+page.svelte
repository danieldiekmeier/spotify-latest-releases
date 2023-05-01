<script>
  import { enhance } from '$app/forms'
  import NoToken from '../components/NoToken.svelte'
  import AlbumList from '../components/AlbumList.svelte'
  import Loading from '../components/Loading.svelte'

  export let data
</script>

{#if !data.token}
  <NoToken />
{:else}
  <form action="?/logout" use:enhance method="POST">
    <button class="LogoutButton"> Logout </button>
  </form>

  {#await data.later.albums}
    <Loading>Fetching albums …</Loading>
  {:then albums}
    <AlbumList {albums} />
  {:catch error}
    <p>Error: {error.message}</p>
    <NoToken />
  {/await}
{/if}

<style>
  .LogoutButton {
    position: absolute;
    top: 1rem;
    right: 0;

    border: 0;
    border-radius: 200px;

    background-color: transparent;
    color: var(--green);
    cursor: pointer;
    z-index: 1;
  }

  .LogoutButton:hover {
    color: var(--green-hover);
  }
</style>
