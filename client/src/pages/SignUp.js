import React, { useState, Fragment }  from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import CustomizedButton from '../features/CustomizedButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar/MainBody'

const useStyles = makeStyles(theme => ({
  signUpText: {
    fontSize: 35,
    color: "black",
    textAlign: "center",
    padding: 30,
  },
  nameField: {
    width: "46%",
    height: 35,
    marginLeft: 10,
  },
  otherField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%",
    height: 35,
  },
  button: {
    margin: 10,
  },
  container: {
    height: 530,
    marginTop: 150,
  }
}));

const Register = () => {
  const classes = useStyles();
  const [firstName, handleFirstName] = useState("");
  const [lastName, handleLastName] = useState("");
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [repeatPassword, handleRepeatPassword] = useState("");
  const [submit, didSubmit] = useState(false);
  const [signUp, handleSignUp] = useState(false);

  if (signUp) {
    return <Redirect to="/prospects" />
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName.length > 0 && lastName.length > 0) {
      handleRegister();
    }
  }

  const handleRegister = () => {
    const data = {
      "email": email.toLowerCase(),
      password,
      confirm_pass: repeatPassword,
      first_name: firstName,
      last_name: lastName,
    };

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      
    .then(res => res.json())
      .then(data => {
      if (!data.access_token) {
        alert(data.message);
      } else {
        localStorage.setItem("mailsender_token", data.access_token);
        handleSignUp(true)
        alert(data.message);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  return (
    <Fragment>
      <NavBar />
      <UserInputContainer classes={{
        root: classes.container
      }} maxWidth="sm">
        <Typography className={classes.signUpText}>Sign up</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.form}
        > 
          <TextField
            error={!submit ? false : firstName.length > 0 ? false : true }
            label="First name"
            value={firstName}
            onChange={e => handleFirstName(e.target.value)}
            helperText="*required"
            className={classes.nameField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={!submit ? false : lastName.length > 0 ? false : true }
            label="Last name"
            value={lastName}
            onChange={e => handleLastName(e.target.value)}
            helperText="*required"
            className={classes.nameField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={!submit ? false : email.length > 0 ? false : true }
            type="email"
            label="Email"
            value={email}
            onChange={e => handleEmail(e.target.value)}
            helperText="*required"
            className={classes.otherField}
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
            className={classes.otherField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={!submit ? false : password === repeatPassword && repeatPassword.length > 0 ? false : true }
            type="password"
            label="Repeat password"
            value={repeatPassword}
            onChange={e => handleRepeatPassword(e.target.value)}
            className={classes.otherField}
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
export default Register;