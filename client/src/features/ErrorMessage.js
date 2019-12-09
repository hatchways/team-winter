import React from 'react'
import {
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles( () => ({
  paper: {
    padding: '30px',
    maxWidth: '400px',
    margin: '0 auto'
  },
  heaader: {
    marginBottom: '20px'
  }
}));

const ErrorMessage = (props) => {
  
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography align="center" variant="h3" className={classes.header}>
        {props.header}
      </Typography>
      <Typography align="center" component="p">
        {props.message}
      </Typography>
    </Paper>
  )

}

export default ErrorMessage;