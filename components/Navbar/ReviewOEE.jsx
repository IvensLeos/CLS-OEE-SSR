import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const ReviewOEE = () => {
  return (
    <>
      <DropdownItem Title="Review OEE" Path="/history/data/">
        <table className="table table-bordered ReviewOEETable">
          <tbody>
            <tr>
              <td>
                <Header>Review By</Header>
                <Item DropdownItem href="/history/data/area/">Business Unit</Item>
                <Item DropdownItem href="/history/data/process/">Production Process</Item>
                <Item DropdownItem href="/history/data/machine/">Machine</Item>
              </td>
            </tr>
          </tbody>
        </table>
      </DropdownItem>
      <style jsx>{`
        :global(.ReviewOEETable) {
          margin-bottom: -7px !important;
        }
      `}</style>
    </>
  )
}

export default ReviewOEE