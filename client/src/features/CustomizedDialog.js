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

const CustomizedDialog = ({ props }) => {
  const { handleCloseDialogAndSaveProspects, dialog, handleDialog } = props

  return (
    <div>
      <Dialog onClose={() => handleDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
      <SelectFromList
        props={props}
      >
      </SelectFromList>
        <DialogActions>
        <Button
            autoFocus
            onClick={() => handleCloseDialogAndSaveProspects()}
            color="secondary"
          >
            Add
          </Button>
          <Button
            autoFocus
            onClick={() => handleDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomizedDialog;
