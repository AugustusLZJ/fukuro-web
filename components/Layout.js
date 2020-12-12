import Navbar from "./Navbar"

const Layout = props => (
  <>
    <Navbar withSearch={props.withSearch} />
    {props.children}
  </>
)

export default Layout