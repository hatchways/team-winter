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
  },
  deleteButton: {
    marginLeft: 0,
    marginRight: 'auto'
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
            open={props.open}
            onClose={props.onClose} >
      <DialogContent>
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <FormControl>
          <InputLabel id="template-select-label">Template</InputLabel>
          <Select labelId="template-select-label"
                  id="template-select"
                  value= {props.step ? props.step.templateId : null}
                  onChange={e => props.step ? setTemplate(e) : props.setTemplateId(e.target.value)} 
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
        { props.delete ? <Button onClick={props.onDeleteClick} color="secondary" className={classes.deleteButton}>Delete</Button> : null }
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