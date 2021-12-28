const Header = ({ children }) => {
  return (
    <>
      <li>
        <h5 className="dropdown-header DropdownHeader">
          {children}
        </h5>
      </li>
      <style jsx>{`
        :global(.DropdownHeader) {
          font-size: 1.05rem !important;
        }
      `}</style>
    </>
  )
}

export default Header