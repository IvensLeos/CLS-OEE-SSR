import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const CaptureProduction = () => {
  return (
    <>
      <DropdownItem Title="Capture Production" Path="/capture/data/production/">
        <table className="table table-bordered CaptureProductionTable">
          <tbody>
            <tr>
              <td>
                <Header>North Side</Header>
                <Item DropdownItem href="/capture/data/production/molding">Molding</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/printing">Printing</Item>
                <Item DropdownItem href="/capture/data/production/printingandassembling">Printing &amp; Assembling</Item>
                <Item DropdownItem href="/capture/data/production/washing">Washing</Item>
                <Item DropdownItem href="/capture/data/production/assembling">Assembling</Item>
                <Item DropdownItem href="/capture/data/production/assemblingandpacking">Assembling &amp; Packing</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/packing">Packing</Item>
                <Item DropdownItem href="/capture/data/production/manualpacking">Manual Packing</Item>
              </td>
              <td>
                <Header>South Side</Header>
                <Item DropdownItem href="/capture/data/production/southmoldingrb">Molding RB</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/southprintingrb">Printing RB</Item>
                <Item DropdownItem href="/capture/data/production/southassemblingrb">Assembling RB</Item>
                <Item DropdownItem href="/capture/data/production/southassemblingandpackingrb">Assembling &amp; Packing RB</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/southpackingrb">Packing RB</Item>
                <Item DropdownItem href="/capture/data/production/southmanualpackingrb">Manual Packing RB</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/southmoldingQ1">Molding Q1</Item>
                <Item DropdownItem href="/capture/data/production/southmoldingQ2">Molding Q2</Item>
                <Item DropdownItem href="/capture/data/production/southmoldingQ3">Molding Q3</Item>
                <Item DropdownItem href="/capture/data/production/southmoldingQ4">Molding Q4</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/southpadprinting">Pad Printing</Item>
              </td>
            </tr>
          </tbody>
        </table>
      </DropdownItem>
      <style jsx>{`
        :global(.CaptureProductionTable) {
          margin-bottom: -7px !important;
        }
      `}</style>
    </>
  )
}

export default CaptureProduction