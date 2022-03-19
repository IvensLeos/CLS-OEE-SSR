import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1 } from "../../util/hooks"

const DashboardGrid = ({ OEES, Header }) => {

  let Router = useRouter()
  let Grid = useRef()
  let Columns = [
    { prop: "ID", name: Header, order: "asc", size: 175, readonly: true, cellTemplate: (createElement, props) => { return createElement('button', { class: "btn btn-outline-primary border-0 col-12 text-dark ID_Dash", onclick: (({ target }) => RedirectTo(target.innerText)) }, props.model[props.prop]) } },
    { prop: "RATE", name: "RATE (PS)", size: 75, columnType: "numeric", readonly: true },
    { prop: "PRODUCED", name: "PRODUCED (EA)", size: 90, columnType: "numeric", readonly: true },
    { prop: "SCRAP", name: "SCRAP (EA)", size: 75, columnType: "numeric", readonly: true },
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

      Grid.current.style.height = `${57 + (OEES.length * 27)}px`

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
      case "MOLDING": Router.push("/review/data/production/molding"); break
      case "PRINTING": Router.push("/review/data/production/printing"); break
      case "PRINTING & ASSEMBLING": Router.push("/review/data/production/printingandassembling"); break
      case "WASHING": Router.push("/review/data/production/washing"); break
      case "ASSEMBLING": Router.push("/review/data/production/assembling"); break
      case "ASSEMBLING & PACKING": Router.push("/review/data/production/assemblingandpacking"); break
      case "PACKING": Router.push("/review/data/production/packing"); break
      case "MANUAL PACKING": Router.push("/review/data/production/manualpacking"); break
    }
  }

  return (
    <>
      <div className="RootContainer">
        <revo-grid ref={Grid} id={Header} exporting="true">
          <div>
            <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${Header} REPORT`} />
          </div>
        </revo-grid>
      </div>
      <br />
      <style jsx>{`
        .RootContainer {
          display: flex;
          width: 1281px;
          margin: 0px auto;
        }
      `}</style>
    </>
  )
}

export default DashboardGrid