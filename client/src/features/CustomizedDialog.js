import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const CustomizedDialog = (
  { handleCloseDialogAndSaveProspects, dialog, handleDialog, actionType ,dataList, setValue, currentValue }
  ) => {

  console.log('dialog', dataList)
  return (
    <div>
      <Dialog onClose={() => handleDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
      <SelectFromList
        actionType={actionType}
        dataList={dataList}
        setValue={setValue}
        currentValue={currentValue}
      >
      </SelectFromList>
        <DialogActions>
          <DialogContent>
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
          </DialogContent>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomizedDialog;
