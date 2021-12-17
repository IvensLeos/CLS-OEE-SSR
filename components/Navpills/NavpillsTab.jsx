import CaptureGrid from "../Revogrid/CaptureGrid"

export default ({ Machines, Process, FailureCodes, ScrapCodes, Rates, ServerData }) => {
  const FormatName = (Name) => Name.replace("'", "").replace("-", "").split(" ").join("")

  return (
    <>
      <ul className="nav nav-pills" id="myTab" role="tablist">
        {Machines.map(({ MACHINE_NAME }, I) => {
          return (
            <li key={`${MACHINE_NAME}-${I}`} className="nav-item" role="presentation">
              <button className={`nav-link ${I === 0 && "active"}`} id={`${FormatName(MACHINE_NAME)}-${I}`} data-bs-toggle="pill" data-bs-target={`#${FormatName(MACHINE_NAME)}`} type="button" role="tab" aria-controls={FormatName(MACHINE_NAME)} aria-selected={I === 0 && "true"}>{MACHINE_NAME}</button>
            </li>
          )
        })}
      </ul>
      <div className="tab-content" id="myTabContent">
        {Machines.map(({ MACHINE_NAME }, I) => {
          return (
            <div key={`${MACHINE_NAME}-${I}`} className={`tab-pane fade ${I === 0 && "show active"}`} id={`${FormatName(MACHINE_NAME)}`} role="tabpanel" aria-labelledby={`${FormatName(MACHINE_NAME)}-${I}`} >
              <CaptureGrid MACHINE_NAME={MACHINE_NAME} PROCESS={Process} FAILURECODES={FailureCodes} SCRAPCODES={ScrapCodes} RATES={Rates} SERVERDATA={ServerData} />
            </div>
          )
        })}
      </div>
    </>
  )
}