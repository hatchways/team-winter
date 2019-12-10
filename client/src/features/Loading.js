import React from 'react'
import {
  CircularProgress,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles( (theme) => ({
  
  progress: {
    margin: '100px auto',
    display: 'block'
  }

}));

const Loading = (props) => {
  
  const classes = useStyles();

  return (
    <CircularProgress className={classes.progress} 
                      size={props.size ? props.size : 60} />
  )

}

export default Loading;