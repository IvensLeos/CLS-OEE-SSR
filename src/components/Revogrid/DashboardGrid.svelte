<script>
  import { beforeUpdate } from 'svelte/internal'
  import ExportToCsvButton from './ExportToCSVButton.svelte'
  import { Day1, Calculate } from './hooks.js'
  
  export let Data, Header

  let Grid, Columns

  Columns = [
    { prop: "ID", name: Header, order: 'asc', size: 141, readonly: true },
    { prop: "RATE", name: "RATE (PS)", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (MIN)", size: 141, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (MIN)", size: 191, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (MIN)", size: 153, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (MIN)", size: 166, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (MIN)", size: 176, readonly: true },
    { prop: "TAU", name: "TAU", size: 69, cellProperties: ({ model }) => { model.TAU = Calculate.TAU(model) }, readonly: true },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A(model) }, readonly: true },
    { prop: "P", name: "P", size: 69, cellProperties: ({ model }) => { model.P = Calculate.P(model) }, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, readonly: true },
  ]

  beforeUpdate(() => {
    if (Grid) {
      Grid.resize = true
      Grid.range = true
      Grid.autoSizeColumn = {
        mode: 'autoSizeOnTextOverlap ',
        allColumns: true,
        preciseSize: true
      }
      Grid.columns = Columns
      Grid.source = Data
      Grid.columns = Columns.map((Col) => {
        Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
        return Col
      })
    }
  })
</script>

<br>
<div class="RootContainer">
  <div></div>
  <revo-grid bind:this={Grid} class="CustomGridClass" exporting="true" autocomplete="true" style="height: {57 + (Data.length * 27)}px; align-items: center;">
    <div class="ExportButtonAligner">
      <ExportToCsvButton {Grid} FileName="{Day1} {Header} REPORT" />
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