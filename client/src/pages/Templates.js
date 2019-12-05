import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../features/NavBar/MainBody';
import {
  makeStyles,
  Paper,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { apiRequest } from '../utils';
import TemplateEditor from '../features/TemplateEditor';
import Loading from '../features/Loading';
import ErrorMessage from '../features/ErrorMessage';
import CustomizedButton from '../features/CustomizedButton';
import ConfirmationDialog from '../features/ConfirmationDialog';



const useStyles = makeStyles( (theme) => ({
  
  container: {
    marginTop: '100px'
  },
  template: {
    marginBottom: '20px',
    padding: '20px 20px 20px 60px'
  },
  addTemplateButton: {
    float: 'right'
  },
  header: {
    marginBottom: '1rem'
  },
  greyText: {
    color: 'grey'
  },
  editIcon: {
    color: "#4FBE75",
    '& :hover': {
      cursor: 'pointer'
    }
  },
  deleteIcon: {
    '& :hover': {
      cursor: 'pointer'
    }
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
        <Grid container item direction="column">
          <Grid item>
            <Typography variant="h6">Nothing here yet</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.greyText}>Click "New Template" to create a template.</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )

}

const Template = (props) => {

  const classes = useStyles();

  const handleEdit = () => {
    props.onEdit(props.template);
  }

  const handleDelete = () => {
    props.onDelete(props.template);
  }

  const typeLabels = {
    'initial': 'Initial Contact',
    'reply': 'Reply'
  }

  return (
    <Paper className={classes.template}>
      <Grid container alignItems="center">
        <Grid container item xs={6} direction="column">
          <Grid item>
            <Typography variant="h6">{props.template.name}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.greyText}>Subject: {props.template.subject}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.greyText}>
            {typeLabels[props.template.type]}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleEdit}>
            <EditIcon className={classes.editIcon}  />
          </IconButton>
        </Grid>
        <Grid item xs={1} >
          <IconButton onClick={handleDelete} >
            <DeleteIcon className={classes.deleteIcon} color="action" />
          </IconButton>
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
  const [error, setError] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect( (props) => {

    getTemplates();

  }, []);

  const getTemplates = async () => {
    apiRequest('GET', '/templates/all')
    .then( (json) => { 
      const sorted = json.templates.sort( (a, b) => {
        const aDate = new Date(a.dateCreated),
              bDate = new Date(b.dateCreated);
        return aDate - bDate;
      });
      setTemplates(sorted);
      console.log(sorted);
      setFetching(false);
    })
    .catch( (e) => {
      setFetching(false);
      setError(true);
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
      console.log(template);
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

  const handleTemplateEdit = (template) => {
    setEditorTemplate(template);
    setDialogOpen(true);
  }

  const handleTemplateDelete = (template) => {
    setToDelete(template);
    setConfirmationOpen(true);
  }

  const handleNewTemplateClick = () => {
    setEditorTemplate({});
    setDialogOpen(true);
  }

  const handleSave = (template) => {
    saveTemplate(template);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const confirmDelete = () => {
    console.log(toDelete);
    apiRequest('DELETE', 'http://localhost:5000/templates', toDelete)
    .then( (json) => {
      console.log(json);
      setConfirmationOpen(false);
      setToDelete(null);
      getTemplates();
    })
  }

  const closeConfirmationDialog = () => {
    setConfirmationOpen(false);
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

  if(error) {
    return (
      <Fragment>
        <NavBar />
        <Container className={classes.container}>
          <TemplatesHeader clickNew={handleNewTemplateClick} />
          <ErrorMessage header="Something went wrong..."
                        message="There was a problem retrieving your templates." />
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
                        onEdit={handleTemplateEdit}
                        onDelete={handleTemplateDelete} />
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
      <ConfirmationDialog open={confirmationOpen}
                          onConfirm={confirmDelete}
                          onClose={closeConfirmationDialog} />
    </Fragment>
  )
}

export default Templates;