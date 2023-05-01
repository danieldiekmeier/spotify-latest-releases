<div class="Loading">
  <div class="Spinner" />

  <slot />
</div>

<style>
  .Loading {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .Spinner {
    display: inline-block;
    height: 1em;
    width: 1em;
    top: 2px;
    margin-right: 0.5em;
    background-color: var(--green);
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(270deg);
    }
  }
</style>
