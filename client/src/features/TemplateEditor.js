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
      body: props.template.body === undefined ? '' : props.template.body,
      nameError: false,
      typeError: false,
      subjectError: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.template.id !== nextProps.template.id ||
            this.state.nameError !== nextState.nameError || 
            this.props.variables !== nextProps.variables || 
            this.state.typeEror !== nextState.typeEror || 
            this.state.subjectError !== nextState.subjectError);
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

  validate() {
    const nameError = this.state.name.length < 1,
          typeError = this.state.type.length < 1,
          subjectError = this.state.subject.length < 1;
    if(nameError || typeError || subjectError) {
      this.setState({
        nameError: nameError,
        typeError: typeError,
        subjectError: subjectError
      })
      return false;
    }
    return true;
  }

  handleSave() {
    if(!this.validate()) return;
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
                  fullWidth
                  required
                  error={this.state.nameError}
                  helperText={this.state.nameError ? "Name is required" : null} />
        {/* Template type */}
        <TextField id="template-type"
                  select fullWidth
                  label="Type"
                  className={classes.inputField}
                  defaultValue={this.props.template.type ? this.props.template.type : 'initial'}
                  onChange={this.handleTypeChange}
                  margin="normal"
                  variant="outlined"
                  required
                  error={this.state.typeError}
                  helperText={this.state.typeError ? "Type is required" : null} >
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
                   fullWidth
                   required
                   error={this.state.subjectError}
                   helperText={this.state.subjectError ? "Subject is required" : null} />
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