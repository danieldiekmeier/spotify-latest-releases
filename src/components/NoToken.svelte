<script>
  import * as Authorize from '../lib/authorize'
</script>

<div class="NoToken">
  <div class="NoToken-content">
    <h2>
      See the latest releases<br />
      of your followed bands
    </h2>

    <div>
      <a href={Authorize.getUrl()} class="NoToken-button">
        Connect with Spotify
      </a>
    </div>

    <small> This website is not made by or affiliated with Spotify. </small>
  </div>
</div>

<style>
  .NoToken {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .NoToken h2 {
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .NoToken-content {
    text-align: center;
  }

  .NoToken-button {
    display: block;
    margin-bottom: 1rem;
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;
    border: 0;
    border-radius: 200px;
    outline: 0;
    background-color: var(--green);
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: background-color box-shadow;
  }

  .NoToken-button:hover {
    background-color: var(--green-hover);
  }

  .NoToken-button:focus {
    box-shadow: 0 0 30px var(--green-active);
  }
</style>
