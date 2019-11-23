import React, { useState, Fragment }  from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import SubmitButton from '../features/SubmitButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar/MainBody'
 
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

  if (login) {
    return <Redirect to="/prospects" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handlelogin();
  }

  const handlelogin = () => {
    const data = {
      email,
      password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    })
      
    .then(res => res.json())
      .then(data => {
      if (!data.access_token) {
        alert(data.message);
      } else {
        localStorage.setItem("mailsender_token", data.access_token);
        handleLogin(true);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }
  
  return (
    <Fragment>
      <NavBar />
      <UserInputContainer maxWidth="sm">
        <Typography className={classes.loginText}>Login</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
        >
          <TextField
            error={!submit ? false : email.length > 0 ? false : true}
            type="email"
            label="Email"
            value={email}
            onChange={e => handleEmail(e.target.value)}
            helperText="*required"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={!submit ? false : password.length >= 6 ? false : true }
            type="password"
            label="Password"
            value={password}
            onChange={e => handlePassword(e.target.value)}
            helperText="*min. 6 characters"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Grid align="center">
            <SubmitButton 
              onClick={() => didSubmit(true)}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Submit
            </SubmitButton>
          </Grid>
        </ValidatorForm>
      </UserInputContainer>
    </Fragment>
  )
}
export default Login;