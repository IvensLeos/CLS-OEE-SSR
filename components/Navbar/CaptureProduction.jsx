import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const CaptureProduction = () => {
  return (
    <>
      <DropdownItem Title="Capture Production" Path="/capture/data/">
        <table className="table table-bordered CaptureProductionTable">
          <tbody>
            <tr>
              <td>
                <Header>North Side</Header>
                <Item DropdownItem href="/capture/data/molding">Molding</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/printing">Printing</Item>
                <Item DropdownItem href="/capture/data/printingandassembling">Printing &amp; Assembling</Item>
                <Item DropdownItem href="/capture/data/washing">Washing</Item>
                <Item DropdownItem href="/capture/data/assembling">Assembling</Item>
                <Item DropdownItem href="/capture/data/assemblingandpacking">Assembling &amp; Packing</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/packing">Packing</Item>
                <Item DropdownItem href="/capture/data/manualpacking">Manual Packing</Item>
              </td>
              <td>
                <Header>South Side</Header>
                <Item DropdownItem href="/capture/data/southmolding">Molding</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/assemblingtips">Assembling Tip&apos;s</Item>
                <Item DropdownItem href="/capture/data/pounchedtubes">Pounched Tubes</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/southpacking">Packing</Item>
                <Item DropdownItem href="/capture/data/southmanualpacking">Manual Packing</Item>
              </td>
              <td>
                <Header>South Side</Header>
                <Item DropdownItem href="/capture/data/southmolding">Molding</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/assemblingtips">Assembling Tip&apos;s</Item>
                <Item DropdownItem href="/capture/data/pounchedtubes">Pounched Tubes</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/southpacking">Packing</Item>
                <Item DropdownItem href="/capture/data/southmanualpacking">Manual Packing</Item>
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

{/* <tbody>
  <tr>
    <td>
      <Header>North Side</Header>
      <Item DropdownItem href="/capture/data/molding">Molding</Item>
      <Divider />
      <Item DropdownItem href="/capture/data/printing">Printing</Item>
      <Item DropdownItem href="/capture/data/printingandassembling">Printing &amp; Assembling</Item>
      <Item DropdownItem href="/capture/data/washing">Washing</Item>
      <Item DropdownItem href="/capture/data/assembling">Assembling</Item>
      <Item DropdownItem href="/capture/data/assemblingandpacking">Assembling &amp; Packing</Item>
      <Divider />
      <Item DropdownItem href="/capture/data/packing">Packing</Item>
      <Item DropdownItem href="/capture/data/manualpacking">Manual Packing</Item>
    </td>
    <td>
      <Header>South Side</Header>
      <Item DropdownItem href="/capture/data/southmolding">Molding</Item>
      <Divider />
      <Item DropdownItem href="/capture/data/assemblingtips">Assembling Tip&apos;s</Item>
      <Item DropdownItem href="/capture/data/pounchedtubes">Pounched Tubes</Item>
      <Divider />
      <Item DropdownItem href="/capture/data/southpacking">Packing</Item>
      <Item DropdownItem href="/capture/data/southmanualpacking">Manual Packing</Item>
    </td>
  </tr>
</tbody> */}