import { useEffect, useState } from "react"
import { useAppContext } from "../Context/Context"

import MachineHistoryChart from "../ChartsJS/MachineHistoryChart"

const GraphMachineModal = () => {
  const { Machine } = useAppContext()
  
  const [MachineData, SetMachineData] = useState([])

  useEffect(() => {
    (async () => {
      const Response = await fetch("/api/machinehistory/" + Machine).then(r => r.json())
      SetMachineData(Response.MACHINEHISTORY)
    })()
  }, [Machine])

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
              <MachineHistoryChart Title={`${Machine} RATE (PS) VS. PRODUCED (EA) HOUR BY HOUR`} MachineData={MachineData} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
              <button type="button" className="btn btn-success">DOWNLOAD CHART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphMachineModal