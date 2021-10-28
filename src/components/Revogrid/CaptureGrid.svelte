<script>
  import { beforeUpdate } from 'svelte/internal'
  import ExportToCsvButton from './ExportToCSVButton.svelte'
  import { Day1, Day2, Calculate } from './hooks.js'
  import { Rates, FailureCodes, ScrapCodes, CurrentPath } from '../../store.js'

  export let MachineName, Process, ServerData

  let Grid, Columns, Data

  const Get = {
    Rate: (Item) => {
      let Rate = $Rates?.filter(({ ITEM, MACHINE, WORK_CENTER }) => ITEM === Item?.toString().toUpperCase() && MACHINE === MachineName && WORK_CENTER === Process)
      return Rate[0]?.RATE || 0
    },
    Area: (Item) => {
      let Area = $Rates?.filter(({ ITEM }) => ITEM === Item?.toString().toUpperCase())
      return Area[0]?.ROOT_AREA || ""
    }
  }

  Columns = [
    { prop: "DATETIME", name: "DATETIME", size: 199, readonly: true },
    { prop: "MACHINE_NAME", name: "MACHINE", readonly: true },
    { prop: "ROOT_AREA", name: "AREA", cellProperties: ({ model }) => { model.ROOT_AREA = Get.Area(model?.ITEM) }, readonly: true },
    { prop: "ITEM", name: "ITEM" },
    { prop: "RATE", name: "RATE (PS)", cellProperties: ({ model }) => { model.RATE = Get.Rate(model?.ITEM) }, readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", cellProperties: ({ model }) => { model.PRODUCED = Calculate.ParseInt(model.PRODUCED) } },
    { prop: "SCRAP", name: "SCRAP (EA)", cellProperties: ({ model }) => { model.SCRAP = Calculate.ParseInt(model.SCRAP) } },
    { prop: "SCRAP_COMMENT", name: "SCRAP DEFECT", columnType: "select", source: $ScrapCodes },
    { prop: "TIME_LOST", name: "LOST TIME (MIN)", cellProperties: ({ model }) => { model.TIME_LOST = Calculate.ParseInt(model.TIME_LOST) } },
    { prop: "TIME_LOST_COMMENT", name: "LOST TIME CODE", columnType: "select", source: $FailureCodes },
    { prop: "COMMENTS", name: "COMMENTS" },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, size: 69, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A2(model) }, size: 69, readonly: true },
    { prop: "P", name: "P", cellProperties: ({ model }) => { if (model.RATE === 0) { model.P = "100.00%" } else { model.P = Calculate.P(model) } }, size: 69, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, size: 69, readonly: true },
  ]

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

  const MergeDataFromDB = () => {
    for (const LocalData in Data) {
      const { DATETIME, MACHINE_NAME } = Data[LocalData]
      let FilterIdentifier = DATETIME?.split(" ").join("") + MACHINE_NAME?.split(" ").join("")
      let Filter = ServerData?.filter(({ IDENTIFIER }) => IDENTIFIER === FilterIdentifier)
      
      if (Filter.length > 0) {
        const { ITEM, PRODUCED, SCRAP } = Filter[0] || 0
        const { SCRAP_COMMENT, TIME_LOST, TIME_LOST_COMMENT } = Filter[0] || ""
        Data[LocalData] = { ...Data[LocalData], ITEM, PRODUCED, SCRAP, SCRAP_COMMENT, TIME_LOST, TIME_LOST_COMMENT }
      }
    }
  }

  $: MergeDataFromDB()

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

  const InsertOrUpdateOEE = async (Data) => {
    try {
      const InsertOrUpdate = await fetch(`${$CurrentPath}.json`, {
        method: "POST",
        body: JSON.stringify(Data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const AfterEdit = async (detail) => {
    const { rowIndex, models } = detail || null
    const Data = await Grid.getSource()

    let UPDATEDATA, IDENTIFIER, ROOT_AREA, PROCESS, RATE, PRODUCED, SCRAP, TIME_LOST

    // For 1 Cell Changed
    if (rowIndex || rowIndex === 0) {

      IDENTIFIER = Data[rowIndex].DATETIME.split(" ").join("") + Data[rowIndex].MACHINE_NAME.split(" ").join("")
      ROOT_AREA = Get.Area(Data[rowIndex].ITEM)
      PROCESS = Process
      RATE = Get.Rate(Data[rowIndex].ITEM)
      PRODUCED = parseInt(Data[rowIndex].PRODUCED) || 0
      SCRAP = parseInt(Data[rowIndex].SCRAP) || 0
      TIME_LOST = parseInt(Data[rowIndex].TIME_LOST) || 0
      delete Data[rowIndex]?.Q
      delete Data[rowIndex]?.A
      delete Data[rowIndex]?.P
      delete Data[rowIndex]?.OEE

      UPDATEDATA = { ...Data[rowIndex], IDENTIFIER, ROOT_AREA, PROCESS, RATE, PRODUCED, SCRAP, TIME_LOST }

      InsertOrUpdateOEE(UPDATEDATA)
    }

    // For Range Cell Changed
    else if (models) {
      for (const model in models) {

        IDENTIFIER = Data[model].DATETIME.split(" ").join("") + Data[model].MACHINE_NAME.split(" ").join("")
        ROOT_AREA = Get.Area(Data[model].ITEM)
        PROCESS = Process
        RATE = Get.Rate(Data[model].ITEM)
        PRODUCED = parseInt(Data[model].PRODUCED) || 0
        SCRAP = parseInt(Data[model].SCRAP) || 0
        TIME_LOST = parseInt(Data[model].TIME_LOST) || 0
        delete Data[model]?.Q
        delete Data[model]?.A
        delete Data[model]?.P
        delete Data[model]?.OEE

        UPDATEDATA = { ...Data[model], IDENTIFIER, ROOT_AREA, PROCESS, RATE, PRODUCED, SCRAP, TIME_LOST }

        InsertOrUpdateOEE(UPDATEDATA)
      }
    }
  }
</script>

<div class="RootContainer">
  <div></div>
  <revo-grid bind:this={Grid} on:afteredit={({ detail }) => AfterEdit(detail)} class="CustomGridClass" exporting="true" autocomplete="true" style="height: {57 + (Data.length * 27)}px; align-items: center;">
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