import Script from "next/script"

export const getServerSideProps = async () => {
  const Data = await fetch(process.env.VERCEL_URL + "/api").then(r => r.json())
  
  return {
    props: {
      BusinessOEE: Data.BusinessOEE,
      ProcessOEE: Data.ProcessOEE,
      PlantOEE: Data.PlantOEE
    }
  }
}

import DashboardGrid from "../components/Revogrid/DashboardGrid"

const IndexPage = ({ BusinessOEE, ProcessOEE, PlantOEE }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      <DashboardGrid OEES={BusinessOEE} Header="BUSINESS UNIT" />
      <DashboardGrid OEES={ProcessOEE} Header="PROCESS" />
      <DashboardGrid OEES={PlantOEE} Header="ALL PLANT" />
    </>
  )
}

export default IndexPage