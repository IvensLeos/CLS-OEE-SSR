<script>
  import { beforeUpdate } from 'svelte/internal'
  import ExportToCsvButton from './ExportToCSVButton.svelte'
  import { Day1, Day2, Calculate } from './hooks'
  
  export let MachineName, Process, FailureCodes, ScrapCodes, Rates // ServerData

  let Grid, Columns, Data

  Columns = [
    { prop: "DATETIME", name: "DATETIME", size: 199, readonly: true },
    { prop: "MACHINE_NAME", name: "MACHINE", readonly: true },
    { prop: "ROOT_AREA", name: "AREA", readonly: true },
    { prop: "ITEM", name: "ITEM" },
    { prop: "RATE", name: "RATE (PS)", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)" },
    { prop: "SCRAP", name: "SCRAP (EA)" },
    { prop: "SCRAP_COMMENT", name: "SCRAP DEFECT", columnType: "select", source: ScrapCodes },
    { prop: "TIME_LOST", name: "LOST TIME (MIN)" },
    { prop: "TIME_LOST_COMMENT", name: "LOST TIME CODE", columnType: "select", source: FailureCodes },
    { prop: "COMMENTS", name: "COMMENTS" },
    { prop: "Q", name: "Q", size: 69, readonly: true },
    { prop: "A", name: "A", size: 69, readonly: true },
    { prop: "P", name: "P", size: 69, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, readonly: true },
  ]

  // Columns = [
  //   { prop: "DATETIME", name: "DATETIME", size: 199, readonly: true },
  //   { prop: "MACHINE_NAME", name: "MACHINE", cellProperties: ({ model }) => { model.MACHINE_NAME = MachineName }, readonly: true },
  //   { prop: "ROOT_AREA", name: "AREA", cellProperties: ({ model }) => { model.ROOT_AREA = Calculate.Area(model, Rates) }, readonly: true },
  //   { prop: "ITEM", name: "ITEM" },
  //   { prop: "RATE", name: "RATE (PS)", cellProperties: ({ model }) => { model.RATE = Calculate.Rate(model, Rates, Process) }, readonly: true },
  //   { prop: "PRODUCED", name: "PRODUCED (EA)", cellProperties: ({ model }) => { model.PRODUCED = Calculate.ParseInt(model.PRODUCED) } },
  //   { prop: "SCRAP", name: "SCRAP (EA)", cellProperties: ({ model }) => { model.SCRAP = Calculate.ParseInt(model.SCRAP) } },
  //   { prop: "SCRAP_COMMENT", name: "SCRAP DEFECT", columnType: "select", source: ScrapCodes },
  //   { prop: "TIME_LOST", name: "LOST TIME (MIN)", cellProperties: ({ model }) => { model.TIME_LOST = Calculate.ParseInt(model.TIME_LOST) } },
  //   { prop: "TIME_LOST_COMMENT", name: "LOST TIME CODE", columnType: "select", source: FailureCodes },
  //   { prop: "COMMENTS", name: "COMMENTS" },
  //   { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, readonly: true },
  //   { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A(model) }, readonly: true },
  //   { prop: "P", name: "P", size: 69, cellProperties: ({ model }) => { model.P = Calculate.P(model) }, readonly: true },
  //   { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, readonly: true },
  // ]

  Data = [
    { "DATETIME": `${Day1} 08:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 09:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 10:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 11:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 12:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 01:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 02:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 03:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 04:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 05:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 06:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 07:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 08:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 09:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 10:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day1} 11:00:00 PM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 12:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 01:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 02:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 03:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 04:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 05:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 06:00:00 AM`, "MACHINE_NAME": MachineName },
    { "DATETIME": `${Day2} 07:00:00 AM`, "MACHINE_NAME": MachineName },
  ]

  beforeUpdate(() => {
    if (Grid) {
      Grid.resize = true
      Grid.range = true
      Grid.useClipboard = true
      Grid.columnTypes = {
        select: new window.RevoGridColumnSelect.CreateSelectColumnType()
      }
      Grid.autoSizeColumn = {
        mode: 'autoSizeOnTextOverlap ',
        allColumns: true,
        preciseSize: true
      }
      Grid.columns = Columns
      Grid.source = Data
      Grid.columns = Columns.map((Col, Index) => {
        if (Index === 0) Col.cellProperties = () => { return { style: { 'font-weight': 'bold' } } }
        Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
        return Col
      })
    }
  })
</script>

<div class="RootContainer">
  <div></div>
  <revo-grid bind:this={Grid} class="CustomGridClass" exporting="true" autocomplete="true" style="height: {57 + (Data.length * 27)}px; align-items: center;">
    <div class="ExportButtonAligner">
      <ExportToCsvButton {Grid} FileName="{Day1} {MachineName} HOUR BY HOUR REPORT" />
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
    max-width: 1396px;
  }

  .ExportButtonAligner {
    min-width: 1475px;
  }
</style>