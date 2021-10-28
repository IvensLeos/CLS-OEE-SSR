<script>
	import CaptureGrid from '../Revogrid/CaptureGrid.svelte'
  export let Machines, ServerData

  const FormatName = (Name) => Name.replace("'", "").replace("-","").split(" ").join("")
</script>

{#key Machines}
  <ul class="nav nav-pills" id="myTab" role="tablist">
  {#each Machines as { MACHINE_NAME }, I}
    <li class="nav-item" role="presentation">
      <button class="nav-link {I === 0 && "active"}" id="{FormatName(MACHINE_NAME)}-{I}" data-bs-toggle="pill" data-bs-target="#{FormatName(MACHINE_NAME)}" type="button" role="tab" aria-controls={FormatName(MACHINE_NAME)} aria-selected={I === 0 && "true"}>{MACHINE_NAME}</button>
    </li>
  {/each}
  </ul>

  <div class="tab-content" id="myTabContent">
    {#each Machines as { MACHINE_NAME, PROCESS }, I}
      <div class="tab-pane fade {I === 0 && "show active"}" id="{FormatName(MACHINE_NAME)}" role="tabpanel" aria-labelledby="{FormatName(MACHINE_NAME)}-{I}">
        <CaptureGrid MachineName={MACHINE_NAME} Process={PROCESS} {ServerData} />
      </div>
    {/each}
  </div>
{/key}