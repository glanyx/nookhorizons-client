import { createMuiTheme, fade } from "@material-ui/core/styles";
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
        color: fade('#000000', 0.6),
      },
      label: {
        fontWeight: '700'
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: fade('#000000', 0.6)
      }
    },
    MuiTypography: {
      h1: {
        color: '#000000'
      }
    }
  }
});

export default theme;
