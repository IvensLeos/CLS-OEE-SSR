<script context="module">
  export async function load({ page, fetch, session, stuff }) {

		const url = `/index.json`
		const response = await fetch(url)

		if (response.ok) {
			return {
				props: {
					BusinessOEE: await response.json()
				}
			}
		}

		return {
			status: response.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>

<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte/internal'
  import ExportToCsvButton from '../components/Revogrid/ExportToCSVButton.svelte'
  export let BusinessOEE

  let Grid, Columns, Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US")

  Columns = [
    { prop: "ID", name: "AREA", order: 'asc', size: 141, readonly: true },
    { prop: "RATE", name: "RATE (PS)", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (MIN)", size: 141, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (MIN)", size: 191, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (MIN)", size: 153, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (MIN)", size: 166, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (MIN)", size: 176, readonly: true },
    { prop: "TAU", name: "TAU", size: 69, readonly: true },
    { prop: "Q", name: "Q", size: 69, readonly: true },
    { prop: "A", name: "A", size: 69, readonly: true },
    { prop: "P", name: "P", size: 69, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, readonly: true },
  ]

  const CreateGrid = () => {
    if (Grid) {
      Grid.resize = true
      Grid.range = true
      Grid.autoSizeColumn = {
        mode: 'autoSizeOnTextOverlap ',
        allColumns: true,
        preciseSize: true
      }
      Grid.columns = Columns
      Grid.source = BusinessOEE
      Grid.columns = Columns.map((Col) => {
        Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
        return Col
      })
    }
  }

  // onMount(() => CreateGrid())
  beforeUpdate(() => CreateGrid())
  // afterUpdate(() => CreateGrid())
</script>

<br>
<div class="RootContainer">
  <div></div>
  <revo-grid bind:this={Grid} class="CustomGridClass" exporting="true" autocomplete="true" style="height: 100px; align-items: center;">
    <div class="ExportButtonAligner">
      <ExportToCsvButton {Grid} FileName="{Day1} HEADER REPORT" />
    </div>
  </revo-grid>
  <div></div>
</div>

<style>
  .RootContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: center;
    text-align: center;
  }

  .CustomGridClass {
    max-width: 1613px;
  }

  .ExportButtonAligner {
    min-width: 1613px;
  }
</style>