import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2AA897",
    },
    secondary: {
      main: "#4FBE75",
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
    MuiInput: {
      underline: {
        borderBottom: 'none',
        '&:after': {
          borderBottom: 'none',
        },
        '&:before': {
          borderBottom: 'none',
        },
      }
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#4FBE75',
          borderWidth: 1,
        },
      }
    },
    MuiDialogContent: {
      root: {
        padding: 30,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: "20px 0px",
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#2AA897',
      }
    },
    MuiInputLabel: {
      root: {
        color: 'black',
        "&$focused": {
          color: '#388e3c',
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          background: "none"
        }
      }
    }
  }
});
