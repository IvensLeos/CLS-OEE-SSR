const Header = ({ children }) => {
  return (
    <>
      <li>
        <h5 className="dropdown-header">
          {children}
        </h5>
      </li>
      <style jsx>{`
        .dropdown-header {
          font-size: 1.05rem;
        }
      `}</style>
    </>
  )
}

export default Header