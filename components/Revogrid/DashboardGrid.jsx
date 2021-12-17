import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1, Calculate } from "../../util/hooks"

const DashboardGrid = ({ OEES, Header }) => {
  let Grid = useRef()
  let Columns = [
    { prop: "ID", name: Header, order: "asc", size: 141, readonly: true },
    { prop: "RATE", name: "RATE (PS)", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (HRS)", size: 141, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (HRS)", size: 191, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (HRS)", size: 153, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (HRS)", size: 166, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (HRS)", size: 176, readonly: true },
    { prop: "TAU", name: "TAU", size: 69, cellProperties: ({ model }) => { model.TAU = Calculate.TAU(model) }, readonly: true },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A(model) }, readonly: true },
    { prop: "P", name: "P", size: 69, cellProperties: ({ model }) => { model.P = Calculate.P(model) }, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, readonly: true },
  ]
  let Data = [...OEES]

  useEffect(() => {
    Grid.current.style.height = `${57 + (OEES.length * 27)}px`
    Grid.current.style.alignItems = "center"

    Grid.current.resize = true
    Grid.current.range = true
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
            <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${Header} REPORT`} />
          </div>
        </revo-grid>
        <div></div>
      </div>
      <style jsx>{`
        :global(.Logo) {
          margin-left: -5px !important;
        }
        :global(.RootContainer) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-content: center;
          text-align: center;
        }

        :global(.CustomGridClass) {
          max-width: 1613px;
        }

        :global(.ExportButtonAligner) {
          min-width: 1613px;
        }
      `}</style>
    </>
  )
}

export default DashboardGrid