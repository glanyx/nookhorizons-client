import { createMuiTheme, fade } from "@material-ui/core/styles";

const theme = createMuiTheme({
  themeName: "Test Theme",
  palette: {
    primary: {
      main: "#aa772c"
    },
    secondary: {
      main: "#4AC948",
      contrastText: "#000000"
    }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiButton: {
      root: {
        color: fade("#000000", 0.6)
      },
      label: {
        fontWeight: "700"
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: fade("#000000", 0.6)
      }
    },
    MuiTypography: {
      h1: {
        color: "#000000"
      },
      body2: {
        fontSize: 12
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        color: '#76531e',
        '&$checked': {
          color: '#76531e'
        }
      }
    },
    MuiFormControlLabel: {
      root: {
        '& .MuiTypography-body1': {
          fontSize: 12
        }
      }
    },
    MuiLink: {
      root: {
        color: '#76531e',
        fontWeight: 'bold'
      }
    }
  }
});

export default theme;
