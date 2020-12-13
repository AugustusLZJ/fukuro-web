import { ThemeProvider } from '@material-ui/styles'
import theme from "../src/theme";
import Navbar from "./Navbar"

const Layout = props => (
  <ThemeProvider theme={theme}>
    <Navbar withSearch={props.withSearch} />
    {props.children}
  </ThemeProvider>
)

export default Layout