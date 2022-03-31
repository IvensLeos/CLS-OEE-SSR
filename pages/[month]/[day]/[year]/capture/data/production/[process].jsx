import Script from "next/script"
import NavpillsTab from "../../../../../../../components/Navpills/NavpillsTab"

export const getServerSideProps = async ({ params }) => {
  const Process = params.process
  const Oees = await fetch(process.env.SITE_URL + "api/capture/data/production/" + Process).then(r => r.json())
  const FailureCodes = await fetch(process.env.SITE_URL + "api/failurecodes").then(r => r.json())
  const ScrapCodes = await fetch(process.env.SITE_URL + "api/scrapcodes").then(r => r.json())
  const Rates = await fetch(process.env.SITE_URL + "api/rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Process })
  }).then(r => r.json())
  const Machines = await fetch(process.env.SITE_URL + "api/machines", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Process })
  }).then(r => r.json())

  const ResolveParam = {
    molding: ["MOLDING", "NORTH SIDE", "MOLDING"],
    printing: ["PRINTING", "NORTH SIDE", "PRINTING"],
    printingandassembling: ["PRINTING & ASSEMBLING", "NORTH SIDE", "PRINTING & ASSEMBLING"],
    washing: ["WASHING", "NORTH SIDE", "WASHING"],
    assembling: ["ASSEMBLING", "NORTH SIDE", "ASSEMBLING"],
    assemblingandpacking: ["ASSEMBLING & PACKING", "NORTH SIDE", "ASSEMBLING & PACKING"],
    packing: ["PACKING", "NORTH SIDE", "PACKING"],
    manualpacking: ["MANUAL PACKING", "NORTH SIDE", "MANUAL PACKING"],
    southmoldingQ1: ["MOLDING Q1", "SOUTH SIDE", "MOLDING"],
    southmoldingQ2: ["MOLDING Q2", "SOUTH SIDE", "MOLDING"],
    southmoldingQ3: ["MOLDING Q3", "SOUTH SIDE", "MOLDING"],
    southmoldingQ4: ["MOLDING Q4", "SOUTH SIDE", "MOLDING"],
    southpadprinting: ["PAD PRINTING", "SOUTH SIDE", "PRINTING"],
    southassemblingrb: ["ASSEMBLING RB", "SOUTH SIDE", "ASSEMBLING"],
    southassemblingandpackingrb: ["ASSEMBLING & PACKING RB", "SOUTH SIDE", "ASSEMBLING & PACKING"],
    southmanualpackingrb: ["MANUAL PACKING RB", "SOUTH SIDE", "MANUAL PACKING"],
    southmoldingrb: ["MOLDING RB", "SOUTH SIDE", "MOLDING"],
    southpackingrb: ["PACKING RB", "SOUTH SIDE", "PACKING"],
    southprintingrb: ["PRINTING RB", "SOUTH SIDE", "PRINTING"],
  }
  
  return {
    props: {
      MACHINES: Machines.MACHINES,
      PROCESS: ResolveParam[Process][0],
      ROOT_PROCESS: ResolveParam[Process][2],
      OEES: Oees.OEES,
      FAILURECODES: FailureCodes.FAILURECODES,
      SCRAPCODES: ScrapCodes.SCRAPCODES,
      RATES: Rates.RATES
    }
  }
}

const CaptureDataProcess = ({ MACHINES, ROOT_PROCESS, PROCESS, OEES, FAILURECODES, SCRAPCODES, RATES }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      <NavpillsTab Machines={MACHINES} RootProcess={ROOT_PROCESS} Process={PROCESS} ServerData={OEES} FailureCodes={FAILURECODES} ScrapCodes={SCRAPCODES} Rates={RATES} />
    </>
  )
}

export default CaptureDataProcess