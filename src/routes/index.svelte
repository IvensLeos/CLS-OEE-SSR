<script context="module">
  export async function load({ fetch }) {

		const URL = `/index.json`
		const Response = await fetch(URL)

		const { BusinessOEE, ProcessOEE, PlantOEE } = await Response.json()

		if (Response.ok) {
			return {
				props: {
					BusinessOEE,
					ProcessOEE,
					PlantOEE
				}
			}
		}

		return {
			status: Response.status,
			error: new Error(`Could not load ${URL}`)
		}
	}
</script>

<script>
  import DashboardGrid from '../components/Revogrid/DashboardGrid.svelte'

  export let BusinessOEE, ProcessOEE, PlantOEE
</script>

<DashboardGrid Header="BUSINESS UNIT" Data={BusinessOEE} />
<DashboardGrid Header="PROCESS" Data={ProcessOEE} />
<DashboardGrid Header="ALL PLANT" Data={PlantOEE} />