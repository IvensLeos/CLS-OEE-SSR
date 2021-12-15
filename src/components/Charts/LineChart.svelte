<script>
  import { onMount } from "svelte/internal"
  
  let Canvas, Chart
  export let Type="line", Data, Options

  const CreateChart = () => Chart = new window.Chart(Canvas.getContext("2d"), {
    type: Type, data: Data, options: Options
  })

  onMount(() => CreateChart())

  $: console.log(Chart?.options.plugins.title.align)
</script>

<canvas bind:this={Canvas} id="MyChartId-{Math.random()}" />

<style>
  canvas {
    max-width: 800px;
    max-height: 400px;
  }
</style>