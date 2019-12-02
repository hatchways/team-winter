import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogActions,
  Button
} from '@material-ui/core';


const ConfirmationDialog = (props) => {

  return (
    <Dialog open={props.open}
            onClose={props.onClose} >
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onConfirm}>Delete</Button>
        <Button color="default" onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )

}

export default ConfirmationDialog;

