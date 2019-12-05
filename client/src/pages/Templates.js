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
import CustomizedButton from '../features/CustomizedButton';


const useStyles = makeStyles( (theme) => ({
  
  container: {
    marginTop: '100px'
  },
  template: {
    marginBottom: '20px',
    padding: '20px'
  },
  addTemplateButton: {
    float: 'right'
  },
  header: {
    marginBottom: '1rem'
  }

}));

const TemplatesHeader = (props) => {

  const classes = useStyles();

  return (
    <Grid container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header} >
      <Grid item
            xs={12}
            sm={8} >
        <Typography variant="h4">Templates</Typography>
      </Grid>
      <Grid item
            xs={12}
            sm={4} >
        <CustomizedButton className={classes.addTemplateButton} onClick={props.clickNew}>New Template</CustomizedButton>
      </Grid>
    </Grid>
  )

}

const NoTemplates = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.template}>
      <Grid container>
        <Grid item>
          <Typography align="center">You don't have any templates yet. Click "New Template" to create one.</Typography>
        </Grid>
      </Grid>
    </Paper>
  )

}

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
    })
    .catch( (e) => {
      setFetching(false);
      console.log(e);
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

  const handleNewTemplateClick = () => {
    setEditorTemplate({});
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
        <TemplatesHeader clickNew={handleNewTemplateClick} />
          <Loading />
        </Container>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <NavBar />
      <Container className={classes.container}>
        <TemplatesHeader clickNew={handleNewTemplateClick} />
        {
          templates.length === 0 ? <NoTemplates /> : null
        }
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
      <Dialog fullWidth
              maxWidth="sm"
              open={dialogOpen}
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