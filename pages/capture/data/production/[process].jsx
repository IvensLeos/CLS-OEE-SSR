import Script from "next/script"
import NavpillsTab from "../../../../components/Navpills/NavpillsTab"

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
    molding: ["MOLDING", "NORTH SIDE"],
    printing: ["PRINTING", "NORTH SIDE"],
    printingandassembling: ["PRINTING & ASSEMBLING", "NORTH SIDE"],
    washing: ["WASHING", "NORTH SIDE"],
    assembling: ["ASSEMBLING", "NORTH SIDE"],
    assemblingandpacking: ["ASSEMBLING & PACKING", "NORTH SIDE"],
    packing: ["PACKING", "NORTH SIDE"],
    manualpacking: ["MANUAL PACKING", "NORTH SIDE"],
    southmoldingQ1: ["MOLDING Q1", "SOUTH SIDE"],
    southmoldingQ2: ["MOLDING Q2", "SOUTH SIDE"],
    southmoldingQ3: ["MOLDING Q3", "SOUTH SIDE"],
    southmoldingQ4: ["MOLDING Q4", "SOUTH SIDE"],
    southpadprinting: ["PAD PRINTING", "SOUTH SIDE"],
  }

  return {
    props: {
      MACHINES: Machines.MACHINES,
      PROCESS: ResolveParam[Process][0],
      OEES: Oees.OEES,
      FAILURECODES: FailureCodes.FAILURECODES,
      SCRAPCODES: ScrapCodes.SCRAPCODES,
      RATES: Rates.RATES
    }
  }
}

const CaptureDataProcess = ({ MACHINES, PROCESS, OEES, FAILURECODES, SCRAPCODES, RATES }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      <NavpillsTab Machines={MACHINES} Process={PROCESS} ServerData={OEES} FailureCodes={FAILURECODES} ScrapCodes={SCRAPCODES} Rates={RATES} />
    </>
  )
}

export default CaptureDataProcess