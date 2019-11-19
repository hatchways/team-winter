import React, { useState }  from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#ff0000'),
    background: "linear-gradient(45deg, #2AA897 10%, #4FBE75 90%)",
    '&:hover': {
      backgroundColor: "#ff0000",
    },
  },
}))(Button);

const Login = () => {
  const classes = useStyles();
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted')
}

  return (
    <ValidatorForm
      onSubmit={handleSubmit}
    >
      <TextValidator
        className={classes.textField}
        label="Email"
        onChange={e => handleEmail(e.target.value)}
        name="email"
        value={email}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      />
      <TextValidator
        className={classes.textField}
        label="Password"
        onChange={e => handlePassword(e.target.value)}
        name="password"
        type="password"
        value={password}
        validators={['required', 'maxLength: 6']}
        errorMessages={['this field is required']}
      />
      <ColorButton 
        variant="contained"
        color="primary"
        className={classes.margin}>
        Submit
      </ColorButton>
    </ValidatorForm>
  )
}
export default Login;



