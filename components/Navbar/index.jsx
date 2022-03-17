import CaptureProduction from "./CaptureProduction"
import ReviewProduction from "./ReviewProduction"
import TopLosses from "./TopLosses"
import ReviewOEE from "./ReviewOEE"
import TogglerButton from "./TogglerButton"
import Logo from "./Logo"
import Item from "./Item"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Logo />
        <TogglerButton />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Item href="/">Dashboard</Item>
            <CaptureProduction />
            <ReviewProduction />
            {/* <TopLosses /> */}
            {/* <ReviewOEE /> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar