import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1, Calculate } from "../../util/hooks"

const DashboardGrid = ({ OEES, Header }) => {
  let Router = useRouter()
  let Grid = useRef()
  let Columns = [
    { prop: "ID", name: Header, order: "asc", size: 168, readonly: true, cellTemplate: (createElement, props) => { return createElement('button', { class: "btn btn btn-link col-12 text-dark", onclick: (({ target }) => RedirectTo(target.innerText)) }, props.model[props.prop]) } },
    { prop: "RATE", name: "RATE (PS)", columnType: "numeric", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", columnType: "numeric", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", columnType: "numeric", readonly: true },
    { prop: "AVAILABLE_TIME", name: "AVAILABLE TIME (HRS)", columnType: "decimal", size: 141, readonly: true },
    { prop: "PLANNED_AVAILABLE_TIME", name: "PLANNED AVAILABLE TIME (HRS)", columnType: "decimal", size: 191, readonly: true },
    { prop: "PLANNED_DOWNTIME", name: "PLANNED DOWNTIME (HRS)", columnType: "decimal", size: 153, readonly: true },
    { prop: "UNPLANNED_DOWNTIME", name: "UNPLANNED DOWNTIME (HRS)", columnType: "decimal", size: 166, readonly: true },
    { prop: "REAL_AVAILABLE_TIME", name: "REAL AVAILABLE TIME (HRS)", columnType: "decimal", size: 176, readonly: true },
    { prop: "TAU", name: "TAU", size: 69, cellProperties: ({ model }) => { model.TAU = Calculate.TAU(model) }, readonly: true },
    { prop: "Q", name: "Q", size: 69, cellProperties: ({ model }) => { model.Q = Calculate.Q(model) }, readonly: true },
    { prop: "A", name: "A", size: 69, cellProperties: ({ model }) => { model.A = Calculate.A(model) }, readonly: true },
    { prop: "P", name: "P", size: 69, cellProperties: ({ model }) => { model.P = Calculate.P(model) }, readonly: true },
    { prop: "OEE", name: "OEE", size: 69, cellProperties: ({ model }) => { model.OEE = Calculate.OEE(model) }, readonly: true },
  ]
  let Data = [...OEES]

  useEffect(() => {
    (async () => {
      const NumericTypePlugin = await import("@revolist/revogrid-column-numeral")

      Grid.current.style.height = `${57 + (OEES.length * 27)}px`
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
      }
      Grid.current.columns = Columns
      Grid.current.source = Data
      Grid.current.columns = Columns.map((Col) => {
        Col.columnTemplate = (createElement, column) => { return createElement('span', { style: { 'font-weight': 'bold', 'color': 'black' }, }, column.name) }
        return Col
      })
    })()
  })

  const RedirectTo = (Param) => {
    switch (Param) {
      case "CRYO": Router.push("/review/data/production/cryo"); break
      case "TIP'S": Router.push("/review/data/production/tips"); break
      case "MCT'S": Router.push("/review/data/production/mcts"); break
      case "SCT'S": Router.push("/review/data/production/scts"); break
      case "CELL": Router.push("/review/data/production/cell"); break
      case "BEAKER": Router.push("/review/data/production/beaker"); break
      case "RESERVOIR": Router.push("/review/data/production/reservoir"); break
      case "CT'S CORNING": Router.push("/review/data/production/ctscorning"); break
      case "CT'S FALCON": Router.push("/review/data/production/ctsfalcon"); break
      case "ROUND BOTTOM": Router.push("/review/data/production/roundbottom"); break
      case "GENOMICS": Router.push("/review/data/production/genomics"); break
      case "BUYOUTS": Router.push("/review/data/production/buyouts"); break
    }
  }

  return (
    <>
      <br />
      <div className="RootContainer">
        <div></div>
        <revo-grid ref={Grid} id={Header} className="CustomGridClass" exporting="true" autocomplete="true">
          <div className="ExportButtonAligner">
            <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${Header} REPORT`} />
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
          max-width: 1640px;
        }
        :global(.ExportButtonAligner) {
          min-width: 1640px;
        }
        :global(.rgCell) {
          text-align: center !important;
        }
      `}</style>
    </>
  )
}

export default DashboardGrid