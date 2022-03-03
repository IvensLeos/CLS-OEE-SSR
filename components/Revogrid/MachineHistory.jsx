import { useEffect, useRef } from "react"

import { PercentStyleForOEE } from "../../util/hooks"
import ExportToCsvButton from "./ExportToCsvButton"

const MachineHistory = ({ OEES, Header }) => {
  let Grid = useRef()

  let Columns = [
    { prop: "OEEDATE", name: "OEE DATE", size: 80, cellProperties: ({ model }) => { model.OEEDATE = new Date(model.OEEDATE).toLocaleDateString("en-US", { timeZone: "America/Chicago" }) }, readonly: true },
    { prop: "_id", name: "MACHINE NAME", readonly: true },
    { prop: "ROOT_AREA", name: "AREA", readonly: true },
    { prop: "ITEM", name: "ITEM", readonly: true },
    { prop: "RATE", name: "RATE (PS)", columnType: "numeric", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", columnType: "numeric", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", columnType: "numeric", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (HRS)", columnType: "decimal", size: 120, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (HRS)", columnType: "decimal", size: 120, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (HRS)", columnType: "decimal", size: 120, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (HRS)", columnType: "decimal", size: 120, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (HRS)", columnType: "decimal", size: 120, readonly: true },
    { prop: "TAU", name: "TAU (%)", size: 69, cellProperties: ({ model }) => { model.TAU = PercentStyleForOEE(model.TAU) }, readonly: true },
    { prop: "Q", name: "Q (%)", size: 69, cellProperties: ({ model }) => { model.Q = PercentStyleForOEE(model.Q) }, readonly: true },
    { prop: "A", name: "A (%)", size: 69, cellProperties: ({ model }) => { model.A = PercentStyleForOEE(model.A) }, readonly: true },
    { prop: "P", name: "P (%)", size: 69, cellProperties: ({ model }) => { model.P = PercentStyleForOEE(model.P) }, readonly: true },
    { prop: "OEE", name: "OEE (%)", size: 69, cellProperties: ({ model }) => { model.OEE = PercentStyleForOEE(model.OEE) }, readonly: true },
  ]

  let Data = [...OEES]

  useEffect(() => {
    (async () => {
      const NumericTypePlugin = await import("@revolist/revogrid-column-numeral")

      Grid.current.style.height = `${59 + (OEES.length * 27)}px`
      Grid.current.style.alignItems = "center"

      Grid.current.resize = true
      Grid.current.range = true
      Grid.current.columnTypes = {
        numeric: new NumericTypePlugin.default("0,0"),
        decimal: new NumericTypePlugin.default("0,0.[00]")
      }
      Grid.current.autoSizeColumn = {
        mode: 'autoSizeOnTextOverlap ',
        allColumns: true,
        preciseSize: true
      },
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
        <div></div>
        <revo-grid ref={Grid} id={Header} className="CustomGridClass" exporting="true" autocomplete="true">
          <div className="ExportButtonAligner">
            <div className="Title">
              <h4>{Header} - OEE HISTORY DATA</h4>
            </div>
            <div className="Export">
              <ExportToCsvButton Grid={Grid} FileName={`${Header} OEE HISTORY REPORT`} />
            </div>
          </div>
        </revo-grid>
        <div></div>
      </div>
      <style jsx>{`
        :global(.RootContainer) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-content: center;
          text-align: center;
        }
        :global(.CustomGridClass) {
          max-width: 1616px;
        }
        :global(.Title) {
          float: left !important;
          margin-left: -807px;
        }
        :global(.Export) {
          float: right !important;
           margin-right: -807px;
        }
        :global(.rgCell) {
          text-align: center !important;
        }
        :global(.header-rgRow, .actual-rgRow) {
          height: 28px !important;
        }
        :global(.header-content) {
          align-self: flex-end !important;
        }
        :global(.header-content > div) {
          white-space: pre-line !important;
          line-height: normal !important;
        }
      `}</style>
    </>
  )
}

export default MachineHistory