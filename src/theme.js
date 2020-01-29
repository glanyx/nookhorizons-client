import { createMuiTheme, fade } from "@material-ui/core/styles";
import { green, brown, black } from "@material-ui/core/colors";

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
        color: fade('#000000', 0.6)
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: fade('#000000', 0.6)
      }
    }
  }
});

export default theme;
