import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"

const MachineHistory = ({ OEES, Header }) => {
  let Grid = useRef()

  let Columns = [
    { prop: "OEEDATE", name: "OEE DATE", size: 80, cellProperties: ({ model }) => { model.OEEDATE = new Date(model.OEEDATE).toLocaleDateString("en-US", { timeZone: "Pacific/Kiritimati" }) }, readonly: true },
    { prop: "_id", name: "MACHINE NAME", size: 142, readonly: true },
    { prop: "ROOT_AREA", name: "AREA", readonly: true },
    { prop: "ITEM", name: "ITEM", readonly: true },
    { prop: "RATE", name: "RATE (PS)", size: 65, columnType: "numeric", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", size: 90, columnType: "numeric", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", size: 70, columnType: "numeric", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (HRS)", columnType: "decimal", size: 95, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (HRS)", columnType: "decimal", size: 115, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (HRS)", columnType: "decimal", size: 109, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (HRS)", columnType: "decimal", size: 121, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (HRS)", columnType: "decimal", size: 95, readonly: true },
    { prop: "TEEP", name: "TEEP (%)", size: 55, columnType: "percent", readonly: true },
    { prop: "Q", name: "Q (%)", size: 55, columnType: "percent", readonly: true },
    { prop: "A", name: "A (%)", size: 55, columnType: "percent", readonly: true },
    { prop: "P", name: "P (%)", size: 55, columnType: "percent", readonly: true },
    { prop: "U", name: "U (%)", size: 55, columnType: "percent", readonly: true },
    { prop: "OEE", name: "OEE (%)", size: 55, columnType: "percent", readonly: true },
  ]

  let Data = [...OEES]

  useEffect(() => {
    (async () => {
      const NumericTypePlugin = await import("@revolist/revogrid-column-numeral")

      Grid.current.style.height = `${59 + (OEES.length * 27)}px`

      Grid.current.range = true
      Grid.current.columnTypes = {
        numeric: new NumericTypePlugin.default("0,0"),
        decimal: new NumericTypePlugin.default("0,0.[00]"),
        percent: new NumericTypePlugin.default("0.00%"),
      }
      Grid.current.columns = Columns
      Grid.current.source = Data
      Grid.current.columns = Columns.map((Col) => {
        Col.columnTemplate = (createElement, column) => { return createElement('div', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
        return Col
      })
    })()
  })

  return (
    <>
      <br />
      <div className="RootContainer">
        <revo-grid ref={Grid} id={Header} exporting="true">
          <div>
            <h4 className="CustomTitle">{Header} - OEE HISTORY DATA</h4>
            <ExportToCsvButton Grid={Grid} FileName={`${Header} OEE HISTORY REPORT`} />
          </div>
        </revo-grid>
      </div>
      <style jsx>{`
        .RootContainer {
          display: flex;
          width: 1513px;
          margin: 0px auto;
        }
        .CustomTitle {
          float: left;
          margin: 0px;
        }
      `}</style>
    </>
  )
}

export default MachineHistory