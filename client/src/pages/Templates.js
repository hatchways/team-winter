import React, { Fragment } from 'react';
import NavBar from '../features/NavBar/MainBody';
import {
  makeStyles,
  Paper
} from '@material-ui/core';

import TemplateEditor from '../features/TemplateEditor';


const useStyles = makeStyles( (theme) => ({
  
  testPaper: {
    margin: '100px auto 100px auto',
    padding: '30px 30px 80px 30px',
    width: '500px',
  }

}))


const sampleBody = `
  <h1>Header</h1>
  <p>Hello,</p>
  <p>This is an email template.</p>
`;

const sampleTemplate = {
  id: 1,
  name: 'The sample template',
  type: 'initial',
  subject: 'Some subject',
  body: sampleBody
};

const sampleVariables = [
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Address'
];

const Templates = (props) => {

  const classes = useStyles();

  const getTemplates = () => {
    
  }

  const saveTemplate = (template) => {
    console.log(template);
  }

  return (
    <Fragment>
      <NavBar />
      <Paper className={classes.testPaper}>
        <TemplateEditor onSave={saveTemplate}
                        template={sampleTemplate}
                        variables={sampleVariables} />
      </Paper>
    </Fragment>
  )
}

export default Templates;