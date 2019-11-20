import React from 'react';
import { Link} from "react-router-dom"
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
    border: "solid #4FBE75 thin",
    borderRadius: "10",
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    textDecoration: "none"
  }
}));

const NavBar = () => {
  const classes = useStyles();

  const path = window.location.pathname;
  let link = null;
  let text = null;

  if ( path === '/signup' ) {
    link = <Link className={classes.buttonText} to="/login">Login</Link>
  }
  
  if ( path === '/login' ) {
    link = <Link className={classes.buttonText} to="/signup">Create</Link>
    text = "Don't have an account?"
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
          <Typography className={classes.noAccount}>
            {text}
          </Typography>
          <Button
            className={classes.button}>
            {link}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;

