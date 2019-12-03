import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../features/NavBar/MainBody';
import {
  makeStyles,
  Paper,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogContent
} from '@material-ui/core';

import { apiRequest } from '../utils';
import TemplateEditor from '../features/TemplateEditor';
import Loading from '../features/Loading';


const useStyles = makeStyles( (theme) => ({
  
  container: {
    marginTop: '100px'
  },
  template: {
    marginBottom: '20px',
    padding: '20px'
  }

}));

const Template = (props) => {

  const classes = useStyles();

  const handleClick = () => {
    props.onClick(props.template);
  }

  return (
    <Paper className={classes.template} onClick={handleClick}>
      <Grid container>
        <Grid item>
          <Typography>{props.template.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )

}

const Templates = (props) => {

  const classes = useStyles();

  const [templates, setTemplates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editorTemplate, setEditorTemplate] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect( (props) => {

    getTemplates();

  }, []);

  const getTemplates = async () => {
    apiRequest('GET', '/templates/all')
    .then( (json) => { 
      setTemplates(json.templates);
      setFetching(false);
    });
  }

  const saveTemplate = (template) => {
    if(template.id) {
      // PUT to update
      apiRequest('PUT', '/templates', template)
      .then( (json) => {
        console.log(json);
        setDialogOpen(false);
        getTemplates();
      }).catch( (e) => {
        console.log(e);
      });
    }
    else {
      // POST to create new
      apiRequest('POST', '/templates', template)
      .then( (json) => {
        console.log(json);
        setDialogOpen(false);
        getTemplates();
      }).catch( (e) => {
        console.log(e);
      });
    }
  }

  const handleTemplateClick = (template) => {
    setEditorTemplate(template);
    setDialogOpen(true);
  }

  const handleSave = (template) => {
    console.log(template);
    saveTemplate(template);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  if(fetching) {
    return (
      <Fragment>
        <NavBar />
        <Container className={classes.container}>
          <Loading />
        </Container>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <NavBar />
      <Container className={classes.container}>
        { 
          templates.map( (template) => {
            return(
              <Template key={template.id}
                        template={template}
                        onClick={handleTemplateClick} />
            );
          })
        }
      </Container>
      <Dialog open={dialogOpen}
              onClose={handleDialogClose} >
        <DialogContent>
          <TemplateEditor template={editorTemplate}
                          onSave={handleSave} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default Templates;