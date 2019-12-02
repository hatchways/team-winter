import React, { Fragment, Component } from 'react'
import {
  withStyles,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core';

import TextEditor from './TextEditor';

const styles = (theme) => ({
  
  inputField: {
    marginBottom: '20px'
  },
  saveButton: {
    marginTop: '20px',
    float: 'right'
  }

});

class TemplateEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorContent: this.props.template.body
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = this.props.template.id !== nextProps.template.id
                         || this.props.variables !== nextProps.variables;
    if(shouldUpdate) return true;
    return false;
  }

  handleTypeChange(event) {
    console.log(event.target.value);
  } 

  handleEditorChange(content) {
    this.setState( { editorContent: content } );
  }

  handleSave() {
    console.log(this.state.editorContent);
  }

  render() {
    const { classes } = this.props;
    return(
      <Fragment>
        {/* Template name */}
        <TextField id="template-name" label="Name" variant="outlined" className={classes.inputField} fullWidth />
        {/* Template type */}
        <TextField id="template-type"
                  select fullWidth
                  label="Type"
                  className={classes.inputField}
                  value={this.props.template.type}
                  onChange={this.handleTypeChange}
                  margin="normal"
                  variant="outlined" >
          <MenuItem key={'initial'} value={'initial'}>Initial Contact</MenuItem>
          <MenuItem key={'reply'} value={'reply'}>Reply</MenuItem>
        </TextField>
        {/* Subject */}
        <TextField id="template-subject" label="Subject" variant="outlined" className={classes.inputField} fullWidth />
        {/* Body */}
        <TextEditor content={this.state.editorContent}
                    onChange={this.handleEditorChange}
                    templateVariables={this.props.variables} />
        <Button variant="contained" 
                size="large" 
                color="primary" 
                className={classes.saveButton}
                onClick={this.handleSave} >
          Save
        </Button>
      </Fragment>
    )
  }
}

export default withStyles(styles)(TemplateEditor);