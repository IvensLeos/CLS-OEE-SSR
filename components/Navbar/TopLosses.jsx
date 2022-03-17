import DropdownItem from "./DropdownItem"
import Divider from "./Divider"
import Header from "./Header"
import Item from "./Item"

const TopLosses = () => {
  return (
    <>
      <DropdownItem Title="Top Losses" Path="/capture/data/production/">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <Header>All Plant</Header>
                <Item DropdownItem href="/capture/data/production/molding">(Q%) Quality Losses</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/molding">(A%) Availability Losses</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/molding">(P%) Performance Losses</Item>
                <Divider />
                <Item DropdownItem href="/capture/data/production/molding">(U%) Utilization Losses</Item>
              </td>
            </tr>
          </tbody>
        </table>
      </DropdownItem>
      <style jsx>{`
        .table-bordered {
          margin-bottom: -7px;
        }
      `}</style>
    </>
  )
}

export default TopLosses