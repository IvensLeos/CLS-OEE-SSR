import Script from "next/script"
import NavpillsTab from "../../../components/Navpills/NavpillsTab"

export const getServerSideProps = async ({ params }) => {
  const Process = params.process
  const Oees = await fetch(process.env.VERCEL_URL + "api/capture/data/" + Process).then(r => r.json())
  const FailureCodes = await fetch(process.env.VERCEL_URL + "api/failurecodes").then(r => r.json())
  const ScrapCodes = await fetch(process.env.VERCEL_URL + "api/scrapcodes").then(r => r.json())
  const Rates = await fetch(process.env.VERCEL_URL + "api/rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Process })
  }).then(r => r.json())
  const Machines = await fetch(process.env.VERCEL_URL + "api/machines", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Process })
  }).then(r => r.json())

  const ResolveParam = {
    molding: "MOLDING",
    printing: "PRINTING",
    printingandassembling: "PRINTING & ASSEMBLING",
    washing: "WASHING",
    assembling: "ASSEMBLING",
    assemblingandpacking: "ASSEMBLING & PACKING",
    packing: "PACKING",
    manualpacking: "MANUAL PACKING",
  }

  return {
    props: {
      MACHINES: Machines.MACHINES,
      PROCESS: ResolveParam[Process],
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