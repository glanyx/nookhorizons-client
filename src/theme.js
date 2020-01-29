import { createMuiTheme } from "@material-ui/core/styles";
import { green, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
  themeName: "Test Theme",
  palette: {
    primary: green,
    secondary: brown
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: "bold",
        color: "#59380e"
      }
    },
    MuiDivider: {
      root: {
        color: "#59380e"
      }
    }
  }
});

export default theme;
