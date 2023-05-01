<script>
  export let filters
</script>

<div class="Filters">
  <label>
    <input type="checkbox" bind:checked={filters.album} />
    Albums
  </label>

  <label>
    <input type="checkbox" bind:checked={filters.single} />
    Singles
  </label>
</div>

<style>
  .Filters {
    padding-top: 2em;
    text-align: center;
  }

  .Filters label {
    display: inline-block;
    margin-left: 1em;
    margin-right: 1em;
  }

  .Filters input {
    margin-right: 0.25em;
  }
</style>
