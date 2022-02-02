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
                <Item DropdownItem href="/capture/data/production/southmolding">Molding</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/assemblingtips">Assembling Tip&apos;s</Item>
                <Item DropdownItem href="/capture/data/production/pounchedtubes">Pounched Tubes</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/southpacking">Packing</Item>
                <Item DropdownItem href="/capture/data/production/southmanualpacking">Manual Packing</Item>
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