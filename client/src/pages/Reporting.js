import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: "30px 50px",
    width: 700,
    height: 500,
  }
}))

const Reporting = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <NavBar />
      <UserInputContainer className={classes.container}>
      <img
        alt="premium"
        src="https://lh3.googleusercontent.com/Ca6SFFdJQ-j2XZAHzv123bnXis5eWkKhd2rmw44aQosUWs8wb_2DACY5GY87yyAPgPnA6c-0Fg=w640-h400-e365"
        >
      </img>
      </UserInputContainer>
    </Fragment>
  )
}

export default Reporting;