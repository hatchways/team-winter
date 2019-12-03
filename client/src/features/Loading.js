import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'

const Loading = (props) => {
  
  return (
    <CircularProgress size={props.size ? props.size : 40} />
  )

}

export default Loading;