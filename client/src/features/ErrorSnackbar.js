import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    color: '#388e3c',
  },
  icon: {
    color: "#388e3c",
  },
  message: {
    padding: 5,
  }
}));

const ErrorSnackbar = (props) => {
  const {message, open} = props;
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      ContentProps={{
        classes: {
          root: classes.root
        }
      }}
      anchor
      message={
        <Fragment>
          <Box display="flex" flexDirection="row" width="100%">
            <Box><WarningIcon className={classes.icon}/></Box>
            <Box alignSelf="center" className={classes.message}> {message} </Box> 
          </Box>
        </Fragment>
        }
    />
  )
}

export default ErrorSnackbar;