import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: "#2AA897",
  secondary: "#4FBE75",
  error: "#d8000c",
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
    }
  }
});




