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
  }
});




