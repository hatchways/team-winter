import React, { useState }  from "react";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Typography } from "@material-ui/core";
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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

const SubmitButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#ff0000'),
    background: "linear-gradient(45deg, #2AA897 10%, #4FBE75 90%)",
    '&:hover': {
      backgroundColor: "#ff0000",
    },
    width: 150,
    height: 50,
    fontSize: 15,
  },
}))(Button);

const LoginContainer = withStyles(theme => ({
  root: {
    backgroundColor: "white",
    width: 500,
    height:400,
    borderRadius: 10,
    marginTop: 200,
  }
}))(Container);

const Login = () => {
  const classes = useStyles();
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('submitted!');
  }

  return (
    <LoginContainer maxWidth="sm">
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
          label="Password"
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
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}>
            Submit
          </SubmitButton>
        </Grid>
      </ValidatorForm>
    </LoginContainer>
  )
}
export default Login;



