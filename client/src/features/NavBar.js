import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  noAccount: {
    flexGrow: 10,
    color: "grey",
    fontSize: "12"
  },
  button: {
    flexGrow: 25,
    color: "black",
    border: "solid #4FBE75 thin",
    borderRadius: "10",
    backgroundColor: "white",
  },
  
}));

const NavBar = () => {
  const classes = useStyles();

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
          <Typography className={classes.noAccount}>
            Don't have an account?
          </Typography>
          <Button
            className={classes.button}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;