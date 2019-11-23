import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import LoginFeatures from './LoginFeatures';
import SignUpFeatures from './SignUpFeatures';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
  },
  mail: {
    flexGrow: 1,
    color: "black"
  },
  sender: {
    flexGrow: 500,
    color: "#4FBE75"
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const path = window.location.pathname.toLowerCase();
  let features = null;
  
  if ( path === '/login' ) {
    features = <LoginFeatures />
  } 
  
  if ( path === '/signup' ) {
    features = <SignUpFeatures />
  }

  return (
    <div>
      <AppBar className={classes.root} position="static">
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
    </div>
  );
}

export default NavBar;

