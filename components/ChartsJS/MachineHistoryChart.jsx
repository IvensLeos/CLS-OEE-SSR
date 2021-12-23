import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, SubTitle } from "chart.js"
import { Bar } from "react-chartjs-2"

import { NewOEE } from "../../util/hooks"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, SubTitle)

const MachineHistoryChart = ({ Title, MachineData, ChartDate = NewOEE().toLocaleDateString() }) => {
  const Options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: Title,
        font: { size: "20" }
      },
      subtitle: {
        display: true,
        position: "bottom",
        text: `OEE Date: ${new Date(Date.now()).toDateString()}`,
        padding: {
          top: 10
        }
      }
    }
  }

  const RenderData = MachineData.filter(({ OEEDATE }) => ChartDate === new Date(OEEDATE).toLocaleDateString())

  const FormatedLabels = RenderData.map(({ DATETIME }) => {
    let UTCHours = new Date(DATETIME).getUTCHours()
    if (UTCHours > 0 && UTCHours <= 12) return `${UTCHours} AM`
    if (UTCHours === 0) return "12 AM"
    else return `${UTCHours - 12} PM`
  })

  const RateData = RenderData.map(({ RATE }) => RATE)
  const ProducedData = RenderData.map(({ PRODUCED }) => PRODUCED)

  const Data = {
    labels: FormatedLabels,
    datasets: [
      {
        type: "line",
        label: "RATE (PS)",
        data: RateData,
        borderColor: "rgba(237, 125, 49, 0.3)",
        backgroundColor: "rgba(237, 125, 49, 1)"
      },
      {
        type: "bar",
        label: "PRODUCED (EA)",
        data: ProducedData,
        backgroundColor: "rgba(68, 114, 196, 1)",
      },
    ],
  }

  return <Bar options={Options} data={Data} />
}

export default MachineHistoryChart