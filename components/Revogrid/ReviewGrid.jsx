import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1, Calculate } from "../../util/hooks"

export default ({ OEES, Area, Process }) => {
  let Grid = useRef()
  let Columns = [
    { prop: "ID", name: "MACHINE", order: 'asc', size: 100, readonly: true },
    { prop: "ITEM", name: "ITEM", size: 100, readonly: true },
    { prop: "RATE", name: "RATE (PS)", size: 75, readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", size: 90, readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", size: 75, readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (HRS)", size: 135, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (HRS)", size: 187, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (HRS)", size: 148, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (HRS)", size: 161, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (HRS)", size: 168, readonly: true },
    { prop: "TAU", name: "TAU", size: 69, cellProperties: ({ model }) => { model.TAU = Calculate.TAU(model) }, readonly: true },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A(model) }, readonly: true },
    { prop: "P", name: "P", size: 69, cellProperties: ({ model }) => { model.P = Calculate.P(model) }, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, readonly: true },
  ]
  let Data = [...OEES]

  useEffect(() => {
    Grid.current.style.height = `${61 + (Data.length * 27)}px`
    Grid.current.style.alignItems = "center"
    
    Grid.current.resize = true
    Grid.current.range = true
    Grid.current.rowHeaders = {
      size: 31
    }
    Grid.current.autoSizeColumn = {
      mode: 'autoSizeOnTextOverlap ',
      allColumns: true,
      preciseSize: true
    }
    Grid.current.columns = Columns
    Grid.current.source = Data
    Grid.current.columns = Columns.map((Col) => {
      Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
      return Col
    })
  }, [])

  return (
    <>
      <br />
      <div className="RootContainer">
        <div></div>
        <revo-grid ref={Grid} className="CustomGridClass" exporting="true" autocomplete="true">
          <div className="ExportButtonAligner">
            <h4 className="Title">{Area} - {Process}</h4>
            <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${Area} ${Process} REPORT`} />
          </div>
        </revo-grid>
        <div></div>
      </div>
      <style jsx>{`
        :global(.RootContainer) {
          display: grid;
          grid-template-columns: 1fr 1614px 1fr;
          align-content: center;
          text-align: center;
        }

        :global(.CustomGridClass) {
          max-width: 1614px;
        }

        :global(.ExportButtonAligner) {
          min-width: 1644px;
        }

        :global(.Title) {
          float: left;
          margin: 0;
        }
      `}</style>
    </>
  )
}