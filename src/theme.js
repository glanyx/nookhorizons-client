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
    },
    tertiary: {
      main: '#0e4d92'
    }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiButton: {
      root: {
        color: fade("#000000", 0.75)
      },
      label: {
        fontSize: 18,
        fontWeight: "700",
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
      h2: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 700,
        color: 'rgba(0, 0, 0, 0.75)',
        textShadow: "1px 2px 2px rgba(210,170,110,.7)",
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
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none'
      },
      rounded: {
        borderRadius: '0px'
      }
    },
    MuiCardHeader: {
      title: {
        fontFamily: "'Varela Round', sans-serif",
        fontWeight: 500
      }
    },
  }
});

export default theme;
