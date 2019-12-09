import React, { useState, Fragment }  from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import CustomizedButton from '../features/CustomizedButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar/MainBody'
import ErrorSnackbar from '../features/ErrorSnackbar';
 
const useStyles = makeStyles( () => ({
  textField: {
    borderRadius: 5,
    width: "95%",
    height: 45,
    margin: 17,
  },
  button: {
    margin: 40,
  },
  loginText: {
    fontSize: 35,
    color: "black",
    textAlign: "center",
    padding: 30,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [submit, didSubmit] = useState(false);
  const [login, handleLogin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  if (login) {
    return <Redirect to="/prospects?gmail_dialog=open" />
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    handlelogin();
  }

  const handlelogin = () => {
    const data = {
      "email": email.toLowerCase(),
      password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      
    .then(res => res.json())
      .then(data => {
      if (!data.access_token) {
        handleSnackBar(data.message)
      } else {
        localStorage.setItem("mailsender_token", data.access_token);
        handleLogin(true);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const handleSnackBar = (message) => {
    setErrorMessage(message);
    setError(true);
  }
  
  return (
    <Fragment>
      <ErrorSnackbar open={error} message={errorMessage}/>
      <NavBar />
      <UserInputContainer maxWidth="sm">
        <Typography className={classes.loginText}>Login</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={!submit ? false : email.length > 0 ? false : true}
            type="email"
            label="Email"
            value={email}
            onChange={e => handleEmail(e.target.value)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            error={!submit ? false : password.length >= 6 ? false : true }
            type="password"
            label="Password min. 6 characters"
            value={password}
            onChange={e => handlePassword(e.target.value)}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Grid align="center">
            <CustomizedButton 
              onClick={() => didSubmit(true)}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Submit
            </CustomizedButton>
          </Grid>
        </ValidatorForm>
      </UserInputContainer>
    </Fragment>
  )
}
export default Login;