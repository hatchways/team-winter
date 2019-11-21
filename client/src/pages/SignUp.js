import React, { useState, Fragment }  from "react";

import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import SubmitButton from '../features/SubmitButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar'

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
  root: {
    height: 520,
    marginTop: 150,
  }
}));

const Login = () => {
  const classes = useStyles();
  const [firstName, handleFirstName] = useState("");
  const [lastName, handleLastName] = useState("");
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [repeatPassword, handleRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('hey')
  }

  return (
    <Fragment>
      <NavBar />
      <UserInputContainer classes={{
        root: classes.root
      }} maxWidth="sm">
        <Typography className={classes.signUpText}>Sign up</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.form}
        > 
          <TextField
            error={firstName.length > 0 ? false : true }
            label="First name"
            value={firstName}
            onChange={e => handleFirstName(e.target.value)}
            helperText="*required"
            className={classes.nameField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={lastName.length > 0 ? false : true }
            label="Last name"
            value={lastName}
            onChange={e => handleLastName(e.target.value)}
            helperText="*required"
            className={classes.nameField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={email.length > 0 ? false : true }
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
            error={password.length >= 6 ? false : true }
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
            error={password === repeatPassword && repeatPassword.length > 0 ? false : true }
            type="password"
            label="Repeat password"
            value={repeatPassword}
            onChange={e => handleRepeatPassword(e.target.value)}
            className={classes.otherField}
            margin="normal"
            variant="outlined"
          />
          <Grid align="center">
            <SubmitButton 
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



