<script>
  import Footer from '../components/Footer.svelte'
</script>

<div class="App">
  <slot />
</div>

<Footer />

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
  }

  :global(body) {
    --green: #0bbb77;
    --green-hover: #0aa86b;
    --green-active: rgba(49, 243, 168, 0.5);

    background-color: #222;
    color: white;
    font-family: sans-serif;
  }

  .App {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
