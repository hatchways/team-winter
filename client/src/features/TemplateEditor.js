import React, { Fragment } from 'react'
import {
  makeStyles,
  TextField,
  MenuItem
} from '@material-ui/core';

import TextEditor from './TextEditor';

const useStyles = makeStyles( (theme) => ({
  
  inputField: {
    marginBottom: '20px'
  }

}))

const TemplateEditor = (props) => {

  const classes = useStyles();

  const handleTypeChange = (event) => {
    console.log(event.target.value);
  } 

  const handleSave = (html) => {
    console.log(html);
  }

  return (
    <Fragment>
      {/* Template name */}
      <TextField id="template-name" label="Name" variant="outlined" className={classes.inputField} fullWidth />
      {/* Template type */}
      <TextField id="template-type"
                 select fullWidth
                 label="Type"
                 className={classes.inputField}
                 value={props.template.type}
                 onChange={handleTypeChange}
                 margin="normal"
                 variant="outlined" >
        <MenuItem key={'initial'} value={'initial'}>Initial</MenuItem>
        <MenuItem key={'reply'} value={'reply'}>Reply</MenuItem>
      </TextField>
      {/* Subject */}
      <TextField id="template-subject" label="Subject" variant="outlined" className={classes.inputField} fullWidth />
      {/* Body */}
      <TextEditor html={props.template.body}
                  onSave={handleSave} />
    </Fragment>
  )
}

export default TemplateEditor;