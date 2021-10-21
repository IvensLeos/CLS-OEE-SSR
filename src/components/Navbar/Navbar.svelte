<script>
  import Logo from './Logo.svelte'
  import TogglerButton from './TogglerButton.svelte'
  import Item from './Item.svelte'
  import Divider from './Divider.svelte'
  import DropdownItem from './DropdownItem.svelte'
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <Logo />
    <TogglerButton/>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <Item href="/">Dashboard</Item>
        <Item href="/graphs">Graphs</Item>
        <DropdownItem Title="Capture Production">
          <Item DropdownItem href="/capture/data/molding">Molding</Item>
          <Divider />
          <Item DropdownItem href="/capture/data/printing">Printing</Item>
          <Item DropdownItem href="/capture/data/printingandassembling">Printing & Assembling</Item>
          <Item DropdownItem href="/capture/data/washing">Washing</Item>
          <Item DropdownItem href="/capture/data/assembling">Assembling</Item>
          <Item DropdownItem href="/capture/data/assemblingandpacking">Assembling & Packing</Item>
          <Divider />
          <Item DropdownItem href="/capture/data/packing">Packing</Item>
          <Item DropdownItem href="/capture/data/manualpacking">Manual Packing</Item>
        </DropdownItem>
        <DropdownItem Title="Review Production">
          <Item DropdownItem href="/review/data/cryo">Cryo</Item>
          <Divider />
          <Item DropdownItem href="/review/data/tips">Tip's</Item>
          <Item DropdownItem href="/review/data/mcts">Mct's</Item>
          <Item DropdownItem href="/review/data/scts">Sct's</Item>
          <Divider />
          <Item DropdownItem href="/review/data/cell">Cell</Item>
          <Item DropdownItem href="/review/data/beaker">Beaker</Item>
          <Item DropdownItem href="/review/data/reservoir">Reservoir</Item>
          <Divider />
          <Item DropdownItem href="/review/data/ctscorning">CT'S Corning</Item>
          <Item DropdownItem href="/review/data/ctsfalcon">CT'S Falcon</Item>
        </DropdownItem>
      </ul>
    </div>
  </div>
</nav>