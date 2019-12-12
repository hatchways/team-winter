import React, { useState, useEffect } from 'react';
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
  Button,
  Snackbar,
  IconButton,
  Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import TemplateEditor from '../TemplateEditor';
import { apiRequest } from '../../utils';

const useStyles = makeStyles( () => ({
  select: {
    width: '100%',
    marginBottom: '20px'
  },
  fullWidth: {
    width: '100%'
  },
  deleteButton: {
    marginLeft: 0,
    marginRight: 'auto'
  },
  newButton: {
    display: 'block',
    margin: '0 auto 20px'
  },
  content: {
    margin: '0 auto',
    width: '500px',
    maxWidth: '90%'
  }
}));

const emptyTemplate = {
  'name': 'New Template',
  'type': 'initial',
  'subject': 'Subject',
  'body': ''
}

const StepDialog = (props) => {
  const classes = useStyles();

  const [editorTemplate, setEditorTemplate] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [onNew, setOnNew] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const variables = ['name', 'from_first_name'];

  useEffect( () => {
    if(props.step !== undefined) setTemplate(props.step.templateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.step, props.open]);
  
  const setTemplate = id => {
    const template = props.findTemplate(id);
    setSelectedId(id);
    setEditorTemplate(template);
  }

  const handleChange = (event) => {
    props.setTemplateId(event.target.value);
    setTemplate(event.target.value);
  }

  const handleSaveTemplate = (template) => {
    (onNew ? 
    apiRequest('POST', '/templates', template) :
    apiRequest('PUT', `/templates/${template.id}`, template))
    .then(json => {
      setSnackbarOpen(true);
      if(!onNew) {
        props.updateTemplate(template, json.template);
      }
      else {
        props.templates.push(json.template);
        setOnNew(false);
      };
      props.setTemplateId(json.template.id);
      setTemplate(json.template.id);
    })
    .catch( (e) => {
      console.log(e);
    });
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleClose = () => {
    setEditorTemplate({});
    props.onClose();
  }

  const handleSave = () => {
    setEditorTemplate({});
    setSelectedId(null);
    props.onSave();
  }

  const newTemplate = () => {
      setEditorTemplate(emptyTemplate);
      setOnNew(true);
  }

  return (
    <Dialog aria-labelledby="edit-step" 
            open={props.open}
            onClose={props.onClose}
            maxWidth="sm" >
      <DialogContent className={classes.content}>
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <Grid container
              alignItems="center"
              justify="space-around" >
          <Grid item xs={12} sm={9}>
            <FormControl className={classes.fullWidth} variant="filled">
              <InputLabel id="template-select-label">Template</InputLabel>
              <Select labelId="template-select-label"
                      id="template-select"
                      value={selectedId}
                      onChange={handleChange}
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
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" 
                    size="small" 
                    color="primary" 
                    onClick={newTemplate}
                    className={classes.newButton} >
              New
            </Button>
          </Grid>
        </Grid>
        <TemplateEditor template={editorTemplate}
                        onSave={handleSaveTemplate} 
                        variables={variables}/>
      </DialogContent>
      <DialogActions>
        { props.delete ? <Button onClick={props.onDeleteClick} color="secondary" className={classes.deleteButton}>Delete</Button> : null }
        <Button onClick={handleSave} color="primary">
          Save Step
        </Button>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
      </DialogActions>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Template saved</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Dialog>
  )
}

export default StepDialog;