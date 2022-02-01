import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const ReviewProduction = () => {
  return (
    <>
      <DropdownItem Title="Review Production" Path="/review/data/production/">
        <table className="table table-bordered ReviewProductionTable">
          <tbody>
            <tr>
              <td>
                <Header>North Side</Header>
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
              </td>
              <td>
                <Header>South Side</Header>
                <Item DropdownItem href="/review/data/production/roundbottom">Round Bottom</Item>
                <Divider />
                <Item DropdownItem href="/review/data/production/genomics">Genomics</Item>
                <Item DropdownItem href="/review/data/production/buyouts">Buyouts</Item>
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