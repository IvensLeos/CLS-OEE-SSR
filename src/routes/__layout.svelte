<script context="module">
  export async function load({ page }) {
    const { path } = page
    return {
      props: { path }
    }
  }
</script>

<script>
  import Navbar from '../components/Navbar/Navbar.svelte'
  import { CurrentPath } from '../store'

  export let path

  $: CurrentPath.set(path)
</script>

<Navbar />
<slot></slot>

<style>
  :global(*) {
    font-family: monospace;
    text-transform: uppercase;
  }

  :global(body) {
    margin: 0;
  }
</style>