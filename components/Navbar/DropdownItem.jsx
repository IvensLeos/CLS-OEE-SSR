import { useRouter } from "next/router"

export default ({ children, Title, Path }) => {
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
        :global(.dropdown-menu) {
          left: auto !important;
        }
      `}</style>
    </>
  )
}