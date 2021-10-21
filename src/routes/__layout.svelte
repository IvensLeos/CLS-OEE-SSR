<script>
  import Navbar from '../components/Navbar/Navbar.svelte'
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