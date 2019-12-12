import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SelectFromList from './SelectFromList';

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);


const AddToCampaignDialog = (props) => {
  const { handleCloseDialogAndSaveProspects, dialog, handleDialog, actionType ,dataList, setValue, currentValue } = props;

  return (
    <div>
      <Dialog onClose={() => handleDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
      <DialogActions>
      <DialogContent>
          <SelectFromList
            actionType={actionType}
            dataList={dataList}
            setValue={setValue}
            currentValue={currentValue}
          >
          </SelectFromList>
          <Box display="flex" justifyContent="flex-end" pt={3} pr={2}>
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
          </Box>
          </DialogContent>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddToCampaignDialog;
