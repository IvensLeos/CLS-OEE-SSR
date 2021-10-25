<script context="module">
  export async function load({ page, fetch }) {
    const { action, param } = page.params

		if (action === "review") {
			const URL = `/${action}/data/${param}.json`
			const Response = await fetch(URL)

			const { OEES } = await Response.json()

			const ResolveParam = {
				cryo: "CRYO",
				tips: "TIP'S",
				mcts: "MCT'S",
				scts: "SCT'S",
				cell: "CELL",
				beaker: "BEAKER",
				reservoir: "RESERVOIR",
				ctscorning: "CT'S CORNING",
				ctsfalcon: "CT'S FALCON",
			}

			return {
				props: { 
					action, 
					param,
					Params: [
						{ Area: ResolveParam[param], Process: "MOLDING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING") },
						{ Area: ResolveParam[param], Process: "PRINTING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PRINTING") },
						{ Area: ResolveParam[param], Process: "PRINTING & ASSEMBLING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PRINTING & ASSEMBLING") },
						{ Area: ResolveParam[param], Process: "WASHING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "WASHING") },
						{ Area: ResolveParam[param], Process: "ASSEMBLING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "ASSEMBLING") },
						{ Area: ResolveParam[param], Process: "ASSEMBLING & PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "ASSEMBLING & PACKING") },
						{ Area: ResolveParam[param], Process: "PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PACKING") },
						{ Area: ResolveParam[param], Process: "MANUAL PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MANUAL PACKING") },
					]
				}
			}
		}

		else if (action === "capture") {
			return {
				props: {
					action,
					param,
					Params: []
				}
			}
		}
	}
</script>

<script>
	import ReviewGrid from '../../../../components/Revogrid/ReviewGrid.svelte'
	import CaptureGrid from '../../../../components/Revogrid/CaptureGrid.svelte'
	export let action, param, Params
</script>

{#if action === "review"}
	{#each Params as { Data, Area, Process }}
		{#if Data?.length > 0}
			<ReviewGrid {Data} {Area} {Process} />
		{/if}
	{/each}
{:else if action === "capture"}
	CaptureData - {param}
	<CaptureGrid />
{/if}