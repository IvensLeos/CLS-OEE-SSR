import Link from "next/link"
import { useRouter } from "next/router"

const Item = ({ children, DropdownItem = false, href}) => {
  let CurrentPath = useRouter().asPath

  const { month, day, year } = useRouter().query

  const CurrentDate = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  const CustomDateString = month + "/" + day + "/" + year
  const CustomDate = new Date(CustomDateString).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  
  const CustomDateParam = CustomDate == "Invalid Date" ? CurrentDate : CustomDate
  // console.log(CustomDateParam)

  if (DropdownItem) {
    return (
      <li>
        <Link href={"/" + CustomDateParam + href}>
          <a className={`dropdown-item ${href === CurrentPath ? "active" : ""}`}>
            {children}
          </a>
        </Link>
      </li>
    )
  }
  else {
    return (
      <li className="nav-item">
        <Link href={href}>
          <a className={`nav-link ${href === CurrentPath ? "active" : ""}`} aria-current="page">
            {children}
          </a>
        </Link>
      </li>
    )
  }
}

export default Item