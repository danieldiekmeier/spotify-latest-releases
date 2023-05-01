<script>
  export let album
</script>

<div class="Album">
  <a class="Album-wrapper" href={album.external_urls.spotify} target="_blank">
    <img class="Album-cover" src={album.cover} alt="" loading="lazy" />

    <div class="Album-content">
      <h3>{album.artists}</h3>
      <h2>{album.name}</h2>
      <p>{album.album_type}</p>
      <p>{album.date}</p>
      <!-- <pre>
        {JSON.stringify(album, null, 2)}
      </pre> -->
    </div>
  </a>

  <img class="Album-backdrop" src={album.cover} alt="" loading="lazy" />
</div>

<style>
  .Album {
    position: relative;
    border-radius: 0.5em;
    overflow: hidden;
  }

  .Album-wrapper {
    display: grid;
    grid-template-columns: 10em auto;
    grid-column-gap: 1em;
    padding: 1em;

    color: inherit;
    text-decoration: none;
    background-color: rgba(#fff, 0.05);
    transition-duration: 0.2s;
    transition-property: background-color;
    z-index: 1;
  }

  .Album-cover {
    display: block;
    aspect-ratio: 1 / 1;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(#000, 0.2);
    transition-duration: 0.1s;
    transition-property: transform, box-shadow;
  }

  .Album:hover .Album-cover {
    transform: scale(1.05);
    box-shadow: 0 3px 8px rgba(#000, 0.3);
  }

  .Album-backdrop {
    position: absolute;
    inset: -20px;
    width: calc(100% + 40px);
    object-fit: cover;
    filter: blur(20px);
    opacity: 0.2;
    transition-duration: 0.2s;
    transition-property: opacity;
  }

  .Album:hover .Album-backdrop {
    opacity: 0.4;
  }

  .Album-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .Album-content h3 {
    margin-bottom: 0rem;
  }

  .Album-content h2 {
    margin-bottom: 0.5rem;
  }

  .Album-content p {
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
</style>
