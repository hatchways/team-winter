import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#008080"
    },
  }, 
  typography: {
    fontFamily: '"Roboto"'
  },
  bgcolor: "#white",
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "45px",
      }
    },
    MuiFormHelperText: {
      contained: {
        margin: "4px"
      },
    },
    MuiTableHead: {
      root: {
        background: "linear-gradient(45deg, #4FBE75 10%, #2AA897 80%)",
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 0,
      },
      elevation4: {
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 2px 0px rgba(0,0,0,0.12)",
      }
    },
    MuiTabs: {
      flexContainer: {
        paddingRight: 100,
      }
    },
    MuiAvatar: {
      root: {
        padding: 10,
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: "0px 15px",
        '&$expanded': {
          margin: 0,
          minHeight: 10,
        },
      },
      content: {
        margin: 0,
        '&$expanded': {
          margin: 0,
          minHeight: 10,
        },
      },
    },
  }
});




