import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button
} from '@material-ui/core'

const useStyles = makeStyles( () => ({
  select: {
    width: '400px'
  }
}));

const StepDialog = (props) => {

  const classes = useStyles();

  const setTemplate = (event) => {
    const newId = event.target.value;
    const newStep = Object.assign({}, props.step);
    newStep.templateId = newId;
    props.setStep(newStep);
  }

  return (
    <Dialog aria-labelledby="edit-step" 
            open={props.open}>
      <DialogContent>
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <FormControl>
          <InputLabel id="template-select-label">Template</InputLabel>
          <Select labelId="template-select-label"
                  id="template-select"
                  value={props.step.templateId}
                  onChange={setTemplate} 
                  className={classes.select} >
            {
            props.templates.map( (template) => {
              return (
                <MenuItem key={template.id} value={template.id}>{template.name}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onSave} color="primary">
          Save
        </Button>
        <Button onClick={props.onClose} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StepDialog;