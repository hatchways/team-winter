import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogActions,
  Button,
  Typography
} from '@material-ui/core';


const ErrorDialog = (props) => {

  return (
    <Dialog open={props.open}
            onClose={props.onClose} >
      <DialogContent>
        <Typography>{props.content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  )

}

export default ErrorDialog;
