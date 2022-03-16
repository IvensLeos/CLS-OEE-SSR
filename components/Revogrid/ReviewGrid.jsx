import { useEffect, useRef } from "react"

import ExportToCsvButton from "./ExportToCsvButton"
import { Day1 } from "../../util/hooks"

import { useAppContext } from "../Context/Context"

const ReviewGrid = ({ OEES, Area, Process }) => {
  const { SetMachine } = useAppContext()

  const OpenModal = (Machine) => {
    SetMachine(Machine)
    const Button = document.getElementById("GraphMachineModalButton")
    Button.click()
  }

  let Grid = useRef()
  let Columns = [
    { prop: "ID", name: "MACHINE", order: 'asc', size: 155, readonly: true, cellTemplate: (createElement, props) => { return createElement('button', { class: "btn btn-outline-primary border-0 col-12 text-dark ID_Dash", onclick: (({ target }) => OpenModal(target.innerText)) }, props.model[props.prop]) }  },
    { prop: "ITEM", name: "ITEM", readonly: true },
    { prop: "RATE", size: 65, name: "RATE (PS)", columnType: "numeric", readonly: true },
    { prop: "PRODUCED", size: 90, name: "PRODUCED (EA)", columnType: "numeric", readonly: true },
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

      Grid.current.style.height = `${61 + (Data.length * 27)}px`

      Grid.current.resize = true
      Grid.current.range = true
      Grid.current.columnTypes = {
        numeric: new NumericTypePlugin.default("0,0"),
        decimal: new NumericTypePlugin.default("0,0.[00]"),
        percent: new NumericTypePlugin.default("0.00%"),
      }
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
        <revo-grid ref={Grid} className="CustomGridClass" exporting="true" autocomplete="true">
          <div className="ExportButtonContainer">
            <div className="CustomTitle">
              <h4>{Area} - {Process}</h4>
            </div>
            <ExportToCsvButton Grid={Grid} FileName={`${Day1} ${Area} ${Process} REPORT`} />
          </div>
        </revo-grid>
        <div></div>
      </div>
      <style jsx>{`
        :global(.CustomTitle) {
          float: left;
        }
        :global(.CustomTitle > h4) {
          margin: 0px;
        }
        :global(.RootContainer) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-content: center;
          text-align: center;
        }
        :global(.CustomGridClass) {
          max-width: 1379px;
        }
        :global(.ExportButtonAligner) {
          min-width: 1379px;
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
        :global(.ID_Dash:hover) {
          color: white !important;
        }
      `}</style>
    </>
  )
}

export default ReviewGrid