import Link from "next/link"
import { useRouter } from "next/router"

const Item = ({ children, DropdownItem = false, href}) => {
  let CurrentPath = useRouter().asPath

  if (DropdownItem) {
    return (
      <li>
        <Link href={href}>
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