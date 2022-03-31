import Script from "next/script"

export const getServerSideProps = async ({ params }) => {
  const { month, day, year } = params

  const Data = await fetch(process.env.SITE_URL + `/api/${month}/${day}/${year}/`).then(r => r.json())

  return {
    props: {
      BusinessOEE: Data.BusinessOEE,
      ProcessOEE: Data.ProcessOEE,
      PlantOEE: Data.PlantOEE,
      month,
      day,
      year
    }
  }
}

import DashboardGrid from "../../../../components/Revogrid/DashboardGrid"

const ReviewBussinessOEE = ({ BusinessOEE, ProcessOEE, PlantOEE, month, day, year }) => {
  
  const CustomDateString = month + "/" + day + "/" + year
  const CustomDate = new Date(CustomDateString).toLocaleDateString("en-US", { timeZone: "America/Chicago" })

  if (CustomDate == "Invalid Date") {
    return <h3>This Is Not A Valid Date Query Parameter, Please <a href="/">Go To Index</a></h3>
  }

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      <br />
      <DashboardGrid OEES={BusinessOEE} Header="BUSINESS UNIT" />
      <DashboardGrid OEES={ProcessOEE} Header="PROCESS" />
      <DashboardGrid OEES={PlantOEE} Header="ALL PLANT" />
    </>
  )
}

export default ReviewBussinessOEE