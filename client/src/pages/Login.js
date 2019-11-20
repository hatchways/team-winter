import React, { useState, Fragment }  from "react";

import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";

import SubmitButton from '../features/SubmitButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar'
import { validatePassword } from '../utils';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow: "0px 0px 2px 0px rgb(175, 173, 179)",
    borderRadius: 5,
    width: "95%",
    margin: 12,
    textIndent: 10,
    padding: 5,
    height: 45,
  },
  button: {
    margin: 40,
  },
  loginText: {
    fontSize: 35,
    color: "black",
    textAlign: "center",
    padding: 30,
  }
}));

const Login = () => {
  const classes = useStyles();
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Fragment>
      <NavBar />
      <UserInputContainer maxWidth="sm">
        <Typography className={classes.loginText}>Login</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
        >
          <TextValidator
            className={classes.textField}
            label="Email"
            onChange={e => handleEmail(e.target.value)}
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            InputProps={{
              disableUnderline: true
            }}
          />
          <br />
          <TextValidator
            className={classes.textField}
            label="Password (min. 6 characters)"
            onChange={e => handlePassword(e.target.value)}
            type="password"
            value={password}
            validators={['required']}
            errorMessages={['this field is required']}
            InputProps={{
              disableUnderline: true
            }}
          />
          <Grid align="center">
            <SubmitButton 
              disabled={!validatePassword(password)}
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



