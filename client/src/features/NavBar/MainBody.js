import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LoginFeatures from './LoginFeatures';
import SignUpFeatures from './SignUpFeatures';
import LoggedInFeatures from './LoggedInFeatures';

const useStyles = makeStyles(({
  root: {
    backgroundColor: "white",
    zIndex: 100
  },
  mail: {
    flexGrow: 1,
    color: "black"
  },
  sender: {
    flexGrow: 500,
    color: "#4FBE75",
  },
}));

const NavBar = (props) => {
  const { userName } = props;
  const classes = useStyles();

  const path = window.location.pathname.toLowerCase();
  let features = null;
  
  if ( path === '/login' ) {
    features = <LoginFeatures />
  } else if ( path === '/signup' ) {
    features = <SignUpFeatures />
  } else {
    features = <LoggedInFeatures userName={userName}/>
  }

  return (
    <Grid xs={12}>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.mail}>
            mail
          </Typography>
          <Typography variant="h6" className={classes.sender}>
            sender
          </Typography>
          {features}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default NavBar;

