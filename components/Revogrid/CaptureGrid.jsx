import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1, Day2, Calculate } from "../../util/hooks"
import { useRouter } from "next/router"

const CaptureGrid = ({ MACHINE_NAME, PROCESS, FAILURECODES, SCRAPCODES, RATES, SERVERDATA }) => {
  let Process = useRouter().query.process
  let Grid = useRef()
  let Columns, Data

  Columns = [
    { prop: "DATETIME", name: "DATETIME", size: 199, readonly: true },
    { prop: "MACHINE_NAME", name: "MACHINE", readonly: true },
    { prop: "ROOT_AREA", name: "AREA", cellProperties: ({ model }) => { model.ROOT_AREA = Get.Area(model?.ITEM) }, readonly: true },
    { prop: "ITEM", name: "ITEM" },
    { prop: "RATE", name: "RATE (PS)", cellProperties: ({ model }) => { model.RATE = Get.Rate(model?.ITEM, model?.TIME_LOST) }, readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", cellProperties: ({ model }) => { model.PRODUCED = Calculate.ParseInt(model.PRODUCED) } },
    { prop: "SCRAP", name: "SCRAP (EA)", cellProperties: ({ model }) => { model.SCRAP = Calculate.ParseInt(model.SCRAP) } },
    { prop: "SCRAP_COMMENT", name: "SCRAP DEFECT", columnType: "select", source: SCRAPCODES },
    { prop: "TIME_LOST", name: "LOST TIME (MIN)", cellProperties: ({ model }) => { model.TIME_LOST = Calculate.ParseInt(model.TIME_LOST) > 60 ? 60 : Calculate.ParseInt(model.TIME_LOST) } },
    { prop: "TIME_LOST_COMMENT", name: "LOST TIME CODE", columnType: "select", source: FAILURECODES },
    { prop: "COMMENTS", name: "COMMENTS" },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, size: 69, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A2(model) }, size: 69, readonly: true },
    { prop: "P", name: "P", cellProperties: ({ model }) => { if (model.RATE === 0) { model.P = "100.00%" } else { model.P = Calculate.P(model) } }, size: 69, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, size: 69, readonly: true },
  ]

  const Get = {
    Rate: (Item, TimeLost) => {
      let Rate = RATES.filter(({ ITEM, MACHINE, WORK_CENTER }) => ITEM === Item?.toString().toUpperCase() && MACHINE === MACHINE_NAME && WORK_CENTER === PROCESS)
      if (TimeLost > 0) return Calculate.ParseInt(Rate[0]?.RATE * (1 - ((TimeLost > 60 ? 60 : TimeLost) / 60)) || 0)
      return Rate[0]?.RATE || 0
    },
    Area: (Item) => {
      let Area = RATES.filter(({ ITEM }) => ITEM === Item?.toString().toUpperCase())
      return Area[0]?.ROOT_AREA || ""
    }
  }

  Data = [
    { "DATETIME": `${Day1} 08:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 09:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 10:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 11:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 12:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 01:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 02:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 03:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 04:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 05:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 06:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 07:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 08:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 09:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 10:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day1} 11:00:00 PM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 12:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 01:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 02:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 03:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 04:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 05:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 06:00:00 AM UTC`, MACHINE_NAME },
    { "DATETIME": `${Day2} 07:00:00 AM UTC`, MACHINE_NAME },
  ]

  useEffect(async () => {
    const SelectTypePlugin = await import("@revolist/revogrid-column-select")

    Grid.current.style.height = `${57 + (Data.length * 27)}px`
    Grid.current.style.alignItems = "center"

    Grid.current.resize = true
    Grid.current.range = true
    Grid.current.useClipboard = true
    Grid.current.columnTypes = {
      select: new SelectTypePlugin.CreateSelectColumnType(),
    }
    Grid.current.autoSizeColumn = {
      mode: 'autoSizeOnTextOverlap ',
      allColumns: true,
      preciseSize: true
    }
    Grid.current.columns = Columns
    Grid.current.source = Data
    Grid.current.rowClass = "ROWCLASS"
    Grid.current.columns = Columns.map((Col, Index) => {
      if (Index === 0) Col.cellProperties = () => { return { style: { 'font-weight': 'bold' } } }
      Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
      return Col
    })

    Grid.current.addEventListener("afteredit", (e) => AfterEdit(e))
  }, [])

  useEffect(() => {
    // $: MergeDataFromDB()
    // const MergeDataFromDB = () => {
    for (const LocalData in Data) {
      const { DATETIME, MACHINE_NAME } = Data[LocalData]
      let FilterIdentifier = DATETIME?.split(" ").join("") + MACHINE_NAME?.split(" ").join("")
      let Filter = SERVERDATA?.filter(({ IDENTIFIER }) => IDENTIFIER === FilterIdentifier)

      if (Filter?.length > 0) {
        const { ITEM, PRODUCED, SCRAP } = Filter[0] || 0
        const { SCRAP_COMMENT, TIME_LOST, TIME_LOST_COMMENT, COMMENTS, ROWCLASS } = Filter[0] || ""
        Data[LocalData] = { ...Data[LocalData], ITEM, PRODUCED, SCRAP, SCRAP_COMMENT, TIME_LOST, TIME_LOST_COMMENT, COMMENTS, ROWCLASS }
      }
    }
    // }
  }, [])

  const InsertOrUpdateOEE = async (Data) => {
    try {
      await fetch("/api/capture/data/" + Process, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const AfterEdit = async ({ detail }) => {
    const { rowIndex, models } = detail || null
    const Data = await Grid.current.getSource()
    let UPDATEDATA, IDENTIFIER, ROOT_AREA, PROCESS2, RATE, PRODUCED, SCRAP, TIME_LOST
    // For 1 Cell Changed
    if (rowIndex || rowIndex === 0) {
      IDENTIFIER = Data[rowIndex].DATETIME.split(" ").join("") + Data[rowIndex].MACHINE_NAME.split(" ").join("")
      ROOT_AREA = Get.Area(Data[rowIndex].ITEM)
      PROCESS2 = PROCESS
      RATE = Get.Rate(Data[rowIndex].ITEM, Data[rowIndex].TIME_LOST)
      PRODUCED = parseInt(Data[rowIndex].PRODUCED) || 0
      SCRAP = parseInt(Data[rowIndex].SCRAP) || 0
      TIME_LOST = parseInt(Data[rowIndex].TIME_LOST) > 60 ? 60 : parseInt(Data[rowIndex].TIME_LOST) || 0
      delete Data[rowIndex]?.Q
      delete Data[rowIndex]?.A
      delete Data[rowIndex]?.P
      delete Data[rowIndex]?.OEE
      if (Data[rowIndex].TIME_LOST > 0 && !Data[rowIndex].TIME_LOST_COMMENT) Data[rowIndex] = { ...Data[rowIndex], ROWCLASS: "ERROR" }
      else if (Data[rowIndex].TIME_LOST == 0 && Data[rowIndex].TIME_LOST_COMMENT) Data[rowIndex] = { ...Data[rowIndex], ROWCLASS: "ERROR" }
      else if (!ROOT_AREA) Data[rowIndex] = { ...Data[rowIndex], ROWCLASS: "ERROR" }
      else Data[rowIndex] = { ...Data[rowIndex], ROWCLASS: "OK" }
      UPDATEDATA = { ...Data[rowIndex], IDENTIFIER, ROOT_AREA, PROCESS: PROCESS2, RATE, PRODUCED, SCRAP, TIME_LOST }
      InsertOrUpdateOEE(UPDATEDATA)
    }
    // For Range Cell Changed
    else if (models) {
      for (const model in models) {
        IDENTIFIER = Data[model].DATETIME.split(" ").join("") + Data[model].MACHINE_NAME.split(" ").join("")
        ROOT_AREA = Get.Area(Data[model].ITEM)
        PROCESS2 = PROCESS
        RATE = Get.Rate(Data[model].ITEM, Data[model].TIME_LOST)
        PRODUCED = parseInt(Data[model].PRODUCED) || 0
        SCRAP = parseInt(Data[model].SCRAP) || 0
        TIME_LOST = parseInt(Data[model].TIME_LOST) > 60 ? 60 : parseInt(Data[model].TIME_LOST) || 0
        delete Data[model]?.Q
        delete Data[model]?.A
        delete Data[model]?.P
        delete Data[model]?.OEE
        if (Data[model].TIME_LOST > 0 && !Data[model].TIME_LOST_COMMENT) Data[model] = { ...Data[model], ROWCLASS: "ERROR" }
        else if (Data[model].TIME_LOST == 0 && Data[model].TIME_LOST_COMMENT) Data[model] = { ...Data[model], ROWCLASS: "ERROR" }
        else if (!ROOT_AREA) Data[model] = { ...Data[model], ROWCLASS: "ERROR" }
        else Data[model] = { ...Data[model], ROWCLASS: "OK" }
        UPDATEDATA = { ...Data[model], IDENTIFIER, ROOT_AREA, PROCESS: PROCESS2, RATE, PRODUCED, SCRAP, TIME_LOST }
        InsertOrUpdateOEE(UPDATEDATA)
      }
    }
  }

  return (
    <>
      <div className="RootContainer">
        <div></div>
          <revo-grid ref={Grid} className="CustomGridClass" exporting="true" autocomplete="true">
            <div className="ExportButtonAligner">
              <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${MACHINE_NAME} HOUR BY HOUR REPORT`} />
            </div>
          </revo-grid>
        <div></div>
      </div>
      <style jsx>{`
        :global(.ERROR) {
          transition-property: background-color, color;
          transition-duration: 0.6s;
          background-color: #EB5454;
          color: white;
        }
        :global(.OK) {
          background-color: white;
          color: black;
        }
        :global(.focused-rgRow) {
          background-color: white;
          color: black;
        }
        :global(.RootContainer) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-content: center;
          text-align: center;
        }
        :global(.CustomGridClass) {
          max-width: 1396px;
        }
        :global(.ExportButtonAligner) {
          min-width: 1475px;
        }
      `}</style>
    </>
  )
}

export default CaptureGrid