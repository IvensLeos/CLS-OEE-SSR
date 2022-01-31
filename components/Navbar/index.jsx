import TogglerButton from "./TogglerButton"
import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Logo from "./Logo"
import Item from "./Item"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Logo />
        <TogglerButton />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Item href="/">Dashboard</Item>
            <DropdownItem Title="Capture Production" Path="/capture/data/production/">
              <Item DropdownItem href="/capture/data/production/molding">Molding</Item>
              <Divider />
              <Item DropdownItem href="/capture/data/production/printing">Printing</Item>
              <Item DropdownItem href="/capture/data/production/printingandassembling">Printing &#38; Assembling</Item>
              <Item DropdownItem href="/capture/data/production/washing">Washing</Item>
              <Item DropdownItem href="/capture/data/production/assembling">Assembling</Item>
              <Item DropdownItem href="/capture/data/production/assemblingandpacking">Assembling &#38; Packing</Item>
              <Divider />
              <Item DropdownItem href="/capture/data/production/packing">Packing</Item>
              <Item DropdownItem href="/capture/data/production/manualpacking">Manual Packing</Item>
            </DropdownItem>
            <DropdownItem Title="Review Production" Path="/review/data/production/">
              <Item DropdownItem href="/review/data/production/cryo">Cryo</Item>
              <Divider />
              <Item DropdownItem href="/review/data/production/tips">Tip&apos;s</Item>
              <Item DropdownItem href="/review/data/production/mcts">Mct&apos;s</Item>
              <Item DropdownItem href="/review/data/production/scts">Sct&apos;s</Item>
              <Divider />
              <Item DropdownItem href="/review/data/production/cell">Cell</Item>
              <Item DropdownItem href="/review/data/production/beaker">Beaker</Item>
              <Item DropdownItem href="/review/data/production/reservoir">Reservoir</Item>
              <Divider />
              <Item DropdownItem href="/review/data/production/ctscorning">CT&apos;S Corning</Item>
              <Item DropdownItem href="/review/data/production/ctsfalcon">CT&apos;S Falcon</Item>
            </DropdownItem>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar