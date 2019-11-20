import React, { useEffect, useState, Fragment }  from "react";

import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Typography , Grid} from "@material-ui/core";

import SubmitButton from '../features/SubmitButton';
import UserInputContainer from '../features/UserInputContainer';
import NavBar from '../features/NavBar'
import { validatePassword } from '../utils';

const useStyles = makeStyles(theme => ({
  signUpText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    padding: 15,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow: "0px 0px 2px 0px rgb(175, 173, 179)",
    borderRadius: 5,
    width: "44%",
    margin: 12,
    textIndent: 10,
    padding: 5,
    height: 45,
  },
  email: {
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
    margin: 20,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [firstName, handleFirstName] = useState("");
  const [lastName, handleLastName] = useState("");
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [repeatPassword, handleRepeatPassword] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });

    return function cleanup() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Fragment>
      <NavBar />
      <UserInputContainer maxWidth="sm">
        <Typography className={classes.signUpText}>Create your free account today!</Typography>
        <ValidatorForm
          onSubmit={handleSubmit}
        > 
          <TextValidator
            className={classes.textField}
            label="First name"
            onChange={e => handleFirstName(e.target.value)}
            value={firstName}
            validators={['required']}
            errorMessages={['this field is required']}
            InputProps={{
              disableUnderline: true
            }}
          />
            <TextValidator
              className={classes.textField}
              label="Last name"
              onChange={e => handleLastName(e.target.value)}
              value={lastName}
              validators={['required']}
              errorMessages={['this field is required']}
              InputProps={{
                disableUnderline: true
              }}
            />
          <TextValidator
            className={classes.email}
            label="Email"
            onChange={e => handleEmail(e.target.value)}
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            InputProps={{
              disableUnderline: true
            }}
          />
          <TextValidator
            className={classes.textField}
            label="Password (min. 6 chars)"
            onChange={e => handlePassword(e.target.value)}
            type="password"
            value={password}
            validators={['required']}
            errorMessages={['this field is required']}
            InputProps={{
              disableUnderline: true
            }}
          />
          <TextValidator
            className={classes.textField}
            label="Repeat password"
            onChange={e => handleRepeatPassword(e.target.value)}
            type="password"
            value={repeatPassword}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['this field is required', 'password mismatch']}
            InputProps={{
              disableUnderline: true
            }}
          />
          <Grid align="center">
            <SubmitButton 
              disabled={!validatePassword(password) || !validatePassword(repeatPassword)}
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



