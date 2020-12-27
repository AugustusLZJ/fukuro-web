import { ThemeProvider } from '@material-ui/styles'
import theme from "../src/theme"
import Navbar from "./navbar"

const Layout = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Navbar
      withSearch={Component.withSearch}
      searchFunc={Component.searchFunc}
    />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default Layout