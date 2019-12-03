import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../features/NavBar/MainBody';
import {
  makeStyles,
  Paper
} from '@material-ui/core';

import { apiRequest } from '../utils';
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

  const [templates, setTemplates] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect( (props) => {

    getTemplates();

  }, []);

  const getTemplates = async () => {
    const response = await apiRequest('GET', '/templates/all');
    setTemplates(response.templates);
  }

  const saveTemplate = (template) => {
    console.log(template);
    if(template.id) {
      // PUT to update
      console.log('put');
      apiRequest('PUT', '/templates', template)
      .catch( (e) => {
        console.log(e);
      });
    }
    else {
      // POST to create new
      console.log(template);
      apiRequest('POST', '/templates', template)
      .catch( (e) => {
        console.log(e);
      });
    }
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