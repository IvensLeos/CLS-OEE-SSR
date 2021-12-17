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
            <Item href="/graphs">Graphs</Item>
            <DropdownItem Title="Capture Production" Path="/capture/data/">
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
            <DropdownItem Title="Review Production" Path="/review/data">
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
  )
}

export default Navbar