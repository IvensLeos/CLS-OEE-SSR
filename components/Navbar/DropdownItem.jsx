import { useRouter } from "next/router"

const DropdownItem = ({ children, Title, Path }) => {
  let CurrentPath = useRouter().asPath

  return (
    <>
      <li>
        <a className={`nav-link dropdown-toggle ${CurrentPath?.includes(Path) ? "active" : ""}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{Title}</a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          {children}
        </ul>
      </li>
      <style jsx>{`
        .dropdown-menu {
          left: auto;
        }
      `}</style>
    </>
  )
}

export default DropdownItem