<script>
  import LineChart from "../../components/Charts/LineChart.svelte"

  const labels = [
    "CRYO", "TIP'S", "MCT'S", "SCT'S", "CELL", 
    "BEAKER", "RESERVOIR", "CT'S CORNING", "CT'S FALCON",
  ]

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'PRODUCED (EA)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [50, 10, 5, 2, 20, 30, 45, 55, 60],
        type: "bar",
      },
      {
        label: 'RATE (PS)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        data: [0, 10, 5, 2, 20, 30, 45, 55, 60].reverse(),
        type: "line",
      }
    ]
  }

  let Options1 = {
    plugins: {
      title: {
        display: true,
        text: 'PRODUCED (EA) BY BUSINESS UNIT V.S. RATE (PS)',
        font: {
          family: "monospace",
          size: 20
        }
      },
      subtitle: {
        display: true,
        text: 'BUSINESS UNIT',
        font: {
          family: "monospace",
          size: 20
        }
      },
    }
  }
</script>

<LineChart Data={data} Options={Options1} />