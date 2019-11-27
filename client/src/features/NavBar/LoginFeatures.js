import React, { Fragment } from 'react';
import { Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import OutlinedButton from '../OutlinedButton';

const useStyles = makeStyles(() => ({
  navText: {
    flexGrow: 10,
    color: "grey",
    fontSize: "12",
  },
  buttonText: {
    color: "black",
    textDecoration: "none",
  }
}));

const LoginFeatures = () => {
  const classes = useStyles();
  
  return (
    <Fragment>
    <Typography className={classes.navText}>
    Don't have an account?
    </Typography>
    <OutlinedButton> <Link className={classes.buttonText} to="/signup">Create</Link> </OutlinedButton>
  </Fragment>
  );
}

export default LoginFeatures;

