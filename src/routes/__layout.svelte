<script context="module">
  export async function load({ page, fetch }) {
    const { path } = page

    const URL = `/index.json`
		const Response = await fetch(URL)

    const { RATES, FAILURECODES, SCRAPCODES } = await Response.json()

    return {
      props: { path, RATES, FAILURECODES, SCRAPCODES }
    }
  }
</script>

<script>
  import Navbar from '../components/Navbar/Navbar.svelte'
  import { CurrentPath, FailureCodes, Rates, ScrapCodes } from '../store'

  export let path, RATES, FAILURECODES, SCRAPCODES

  $: CurrentPath.set(path)
  $: Rates.set(RATES)
  $: FailureCodes.set(FAILURECODES)
  $: ScrapCodes.set(SCRAPCODES)
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