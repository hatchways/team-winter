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
    marginBottom: '20px',
    float: 'right'
  }

});

class TemplateEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.template.name === undefined ? '' : props.template.name,
      type: props.template.type === undefined ? 'initial' : props.template.type,
      subject: props.template.subject === undefined ? '' : props.template.subject,
      body: props.template.body === undefined ? '' : props.template.body
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = this.props.template.id !== nextProps.template.id
                         || this.props.variables !== nextProps.variables;
    if(shouldUpdate) return true;
    return false;
  }

  handleNameChange(event) {
    this.setState( {name: event.target.value} );
  }

  handleSubjectChange(event) {
    this.setState( {subject: event.target.value} );
  }

  handleTypeChange(event) {
    this.setState( {type: event.target.value} );
  } 

  handleEditorChange(content) {
    this.setState( { body: content } );
  }

  handleSave() {
    const toSave = {
      id: this.props.template.id,
      name: this.state.name,
      type: this.state.type,
      subject: this.state.subject,
      body: this.state.body
    }
    this.props.onSave(toSave);
  }

  render() {
    const { classes } = this.props;
    return(
      <Fragment>
        {/* Template name */}
        <TextField id="template-name" 
                  defaultValue={this.props.template.name}
                  label="Name" 
                  variant="outlined" 
                  className={classes.inputField} 
                  onChange={this.handleNameChange}
                  fullWidth />
        {/* Template type */}
        <TextField id="template-type"
                  select fullWidth
                  label="Type"
                  className={classes.inputField}
                  defaultValue={this.props.template.type}
                  onChange={this.handleTypeChange}
                  margin="normal"
                  variant="outlined" >
          <MenuItem key={'initial'} value={'initial'}>Initial Contact</MenuItem>
          <MenuItem key={'reply'} value={'reply'}>Reply</MenuItem>
        </TextField>
        {/* Subject */}
        <TextField id="template-subject" 
                  defaultValue={this.props.template.subject}
                  label="Subject" 
                  variant="outlined" 
                  className={classes.inputField} 
                  onChange={this.handleSubjectChange}
                  fullWidth />
        {/* Body */}
        <TextEditor content={this.state.body}
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