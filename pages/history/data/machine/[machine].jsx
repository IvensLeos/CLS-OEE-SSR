import Script from "next/script"
import MachineHistory from "../../../../components/Revogrid/MachineHistory"

export const getServerSideProps = async ({ params }) => {
  const Machine = params.machine
  const { MACHINE_OEE_HISTORY } = await fetch(process.env.SITE_URL + "api/history/data/machine/" + Machine).then(r => r.json())

  return {
    props: {
      MACHINE: Machine,
      MACHINE_OEE_HISTORY
    }
  }
}

const MachineHistoryPerDay = ({ MACHINE, MACHINE_OEE_HISTORY }) => {

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      <MachineHistory OEES={MACHINE_OEE_HISTORY} Header={MACHINE} />
      <br />
    </>
  )
}

export default MachineHistoryPerDay