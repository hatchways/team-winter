import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SelectFromList from '../features/SelectFromList';

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialog = ({ propsForDialog }) => {
  const { handleCloseDialogAndSaveProspects, dialog } = propsForDialog

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={dialog}>
      <SelectFromList
        propsForDialog={propsForDialog}
      >
      </SelectFromList>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleCloseDialogAndSaveProspects()}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomizedDialog;
