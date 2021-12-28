import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const ReviewProduction = () => {
  return (
    <>
      <DropdownItem Title="Review Production" Path="/review/data">
        <table className="table table-bordered ReviewProductionTable">
          <tbody>
            <tr>
              <td>
                <Header>North Side</Header>
                <Item DropdownItem href="/review/data/cryo">Cryo</Item>
                <Divider />
                <Item DropdownItem href="/review/data/tips">Tip&apos;s</Item>
                <Item DropdownItem href="/review/data/mcts">Mct&apos;s</Item>
                <Item DropdownItem href="/review/data/scts">Sct&apos;s</Item>
                <Divider />
                <Item DropdownItem href="/review/data/cell">Cell</Item>
                <Item DropdownItem href="/review/data/beaker">Beaker</Item>
                <Item DropdownItem href="/review/data/reservoir">Reservoir</Item>
                <Divider />
                <Item DropdownItem href="/review/data/ctscorning">CT&apos;S Corning</Item>
                <Item DropdownItem href="/review/data/ctsfalcon">CT&apos;S Falcon</Item>
              </td>
              <td>
                <Header>South Side</Header>
                <Item DropdownItem href="/review/data/roundbottom">Round Bottom</Item>
                <Divider />
                <Item DropdownItem href="/review/data/genomics">Genomics</Item>
                <Item DropdownItem href="/review/data/buyouts">Buyouts</Item>
              </td>
            </tr>
          </tbody>
        </table>
      </DropdownItem>
      <style jsx>{`
        :global(.ReviewProductionTable) {
          margin-bottom: -7px !important;
        }
      `}</style>
    </>
  )
}

export default ReviewProduction