import { useEffect, useState } from "react"
import { useAppContext } from "../Context/Context"

import MachineHistoryChart from "../ChartsJS/MachineHistoryChart"
import { NewGTE } from "../../util/hooks"

const GraphMachineModal = () => {
  const { Machine } = useAppContext()
  
  const [MachineData, SetMachineData] = useState([])

  useEffect(() => {
    (async () => {
      const Response = await fetch("/api/machinehistory/" + Machine).then(r => r.json())
      SetMachineData(Response.MACHINEHISTORY)
    })()
  }, [Machine])

  const [ChartDate, SetChartDate] = useState(NewGTE().toLocaleDateString())

  const DecreaseChartDate = (OldDate) => {
    OldDate = new Date(OldDate)
    OldDate.setDate(OldDate?.getDate() - 1)
    SetChartDate(OldDate.toLocaleDateString())
  }

  const IncreaseChartDate = (OldDate) => {
    OldDate = new Date(OldDate)
    OldDate.setDate(OldDate?.getDate() + 1)
    SetChartDate(OldDate.toLocaleDateString())
  }

  const DatePicker = () => {
    return (
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" onClick={() => DecreaseChartDate(ChartDate)} className="btn btn-primary">&lt;</button>
        <button type="button" onClick={() => SetChartDate(NewGTE().toLocaleDateString())}className="btn btn-outline">{ChartDate}</button>
        <button type="button" onClick={() => IncreaseChartDate(ChartDate)} className="btn btn-primary">&gt;</button>
      </div>
    )
  }

  return (
    <div id="GraphMachineModal">
      <button type="button" id="GraphMachineModalButton" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true} />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{MachineData?.[0]?.ROOT_AREA} - {MachineData?.[0]?.PROCESS}: {MachineData?.[0]?.MACHINE_NAME} PRODUCTION CHART</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <MachineHistoryChart ChartDate={ChartDate} Title={`${Machine} RATE (PS) VS. PRODUCED (EA) HOUR BY HOUR`} MachineData={MachineData} />
            </div>
            <div className="modal-footer">
              <DatePicker />
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphMachineModal