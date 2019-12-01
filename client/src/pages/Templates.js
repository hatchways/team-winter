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
  <h1>The Header</h1>
  <p>Hello, recipient</p>
  <p>This is a message for you.</p>
  <p>Best regards,</p>
  <p>The sender</p>
`;

const sampleTemplate = {
  templateId: 1,
  templateName: 'The sample template',
  type: 'initial',
  subject: 'Some subject',
  body: sampleBody
}

const Templates = (props) => {

  const classes = useStyles();

  const saveTemplate = (template) => {
    console.log(template);
  }

  return (
    <Fragment>
      <NavBar />
      <Paper className={classes.testPaper}>
        <TemplateEditor onSave={saveTemplate}
                        template={sampleTemplate} />
      </Paper>
    </Fragment>
  )
}

export default Templates;