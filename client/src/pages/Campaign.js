import React, { Fragment, useState, useEffect } from 'react';
import {
  makeStyles,
  Container,
  Button
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CloudIcon from '@material-ui/icons/Cloud';

import NavBar from '../features/NavBar/MainBody';
import CampaignSummary from '../features/Campaign/CampaignSummary';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import StepDialog from '../features/Campaign/StepDialog';
import ConfirmationDialog from '../features/ConfirmationDialog';
import SuccessSnackbar from '../features/SuccessSnackbar';
import CampaignSidePanel from '../features/CampaignSidePanel';
import CampaignHeader from '../features/Campaign/CampaignHeader';
import StepsTabs from '../features/StepsTabs';
import { apiRequest } from '../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '100px'
  },
  mt1b3: {
    marginTop: '1rem',
    marginBottom: '3rem'
  },
  sidePanelContainer: {
    height: '100%'
  },
  prospectList: {
    overflow: "auto",
    width: "100%",
    height: 500,
    marginTop: 0,
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 12,
      paddingRight: 15,
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    }
  },
}));

const Campaign = (props) => {

  const classes = useStyles();

  const [campaign, setCampaign] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editStep, setEditStep] = useState({});
  const [newOpen, setNewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [templateId, setTemplateId] = useState(0);
  const [templates, setTemplates] = useState([{}]);
  const [importSuccess, setImportSuccess] = useState(false);
  const [executeSuccess, setExecuteSuccess] = useState(false);
  const [currentView, setCurrentView] = useState('summary');
  const [selectedProspects, handleSelectedProspects] = useState([]);
  const [prospects, handleProspects] = useState([{}]);

  useEffect( () => {
    getCampaign();
    getTemplates();
    getAllProspects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProspects = () => {
    const campaignId = props.match.params.id;
    apiRequest('GET', `/campaign/${campaignId}/prospects`)
    .then( result => {
      const listOfProspects = [];
      const cloudIcon = <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />

      result.Prospects.map(prospect => {
        const prospectObj = {
          'id': prospect.id,
          'check': 'check',
          'Email': prospect.email,
          cloudIcon,
          'Status': prospect.status,
          'Owner': prospect.name,
          'Campaigns': prospect.campaigns,
          'Imported_from': prospect.imported_from
        }
        return listOfProspects.push(prospectObj)
      })
      handleProspects(listOfProspects)
    })
    .catch( e => {
      console.log(e);
    })
  }

  const findStepIndex = (step) => {
    for(let i=0; i<campaign.steps.length; i++) {
      if(campaign.steps[i].id === step.id) return i;
    }
    return -1;
  }

  const findTemplate = (id) => {
    for(let template of templates) {
      if(template.id === id) return template;
    }
    return {};
  }

  const findTemplateIndex = (template) => {
    for(let i=0; i<templates.length; i++) {
      if(templates[i].id === template.id) return i;
    }
    return -1;
  }

  const createStepObject = stepData => {
    const prospects = [];
    for (let prospect of stepData.prospects) {
      prospects.push(
        {
          id : prospect.id,
          email : prospect.email,
          owner : prospect.name,
          status : prospect.status,
      })
    }
    return {
      id : stepData.id,
      templateId : stepData.template.id,
      templateName : stepData.template.name,
      sent : 100,
      replied : 25,
      prospects : prospects
    }
  }

  const handleCampaign = data => {
    const campaign = data.campaign;
    const stepsData = campaign.steps;
    const steps = [];
    for(let stepData of stepsData) {
      const step = createStepObject(stepData);
      steps.push(step);
    }

    setCampaign(
      {
        id : campaign.id,
        title : campaign.name,
        userName : campaign.owner_name,
        prospectsTotal : campaign.prospects,
        prospectsContacted : 20,
        prospectsReplied : 10,
        steps : steps
    })
  }

  const getCampaign =  () => {
    const id = props.match.params.id;
    apiRequest('GET', `/campaigns/${id}`)
    .then(data => {
      handleCampaign(data)
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const handleTemplates = data => {
    const templatesData = data['templates'];
    const templates = [];
    for(let template of templatesData) {
      templates.push({
        id : template.id,
        name : template.name,
        type : template.type,
        subject : template.subject,
        body : template.body
      })
    }
    setTemplates(templates);
  }

  const handleNewTemplate = template => {
    setTemplates([...templates, template])
  }

  const getTemplates = () => {
    apiRequest('GET', '/templates')
    .then(data => {
      handleTemplates(data)
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const updateStep = (step) => {
    console.log('Update: ' + JSON.stringify(step));
    // update UI
    const idx = findStepIndex(step);
    campaign.steps[idx].templateId = step.templateId;
    campaign.steps[idx].templateName = findTemplate(step.templateId).name;
    setCampaign(campaign);

    /**
     * TODO:
     * update server
     * update template_id on step with id=step.id
     */
  }

  const addNewStep = () => {
    const id = campaign.id;
    apiRequest('POST', `/campaign/${id}/steps`, {id : templateId})
    .then(data => createStepObject(data.step))
      .then(step => {
          const newCampaign = Object.assign({}, campaign);
          newCampaign.steps.push(step);
          setCampaign(newCampaign);
        })
    .catch(err => {
      console.log(err.message);
    });
  }

  const deleteStep = () => {
    console.log('Delete: ' + JSON.stringify(editStep));
    setConfirmOpen(false);
    setEditOpen(false);
    // update UI
    const idx = findStepIndex(editStep);
    campaign.steps.splice(idx, 1);
    setCampaign(campaign);

    /**
     * TODO:
     * update server
     * delete step with id=editStep.id
     */
  }
  const updateTemplate = (oldTemplate, newTemplate) => {
    const idx = findTemplateIndex(oldTemplate);
    templates[idx] = newTemplate;
    setTemplates(templates);
  }

//---------------Edit Step-----------------------//
  const handleEditOpen = (idx) => {
    setEditStep(campaign.steps[idx]);
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditOpen(false);
  }

  const handleEditSave = () => {
    updateStep(editStep);
    setEditOpen(false);
  }

  /*
  const handleSetEditStep = (newStep) => {
    setEditStep(newStep);
  }
  */
//-----------------Create Step-----------------------//
  const handleNewOpen = () => {
    setNewOpen(true);
  }

  const handleNewClose = () => {
    setNewOpen(false);
  }

  const handleNewSave = () => {
    addNewStep();
    setNewOpen(false);
  }

  const handleDelete = () => {
    setConfirmOpen(true);
  }

  const confirmClose = () => {
    setConfirmOpen(false);
  }

  const importSuccessClose = () => {
    setImportSuccess(false);
  }

  const executeSuccessClose = () => {
    setExecuteSuccess(false)
  }

  const mergeStepProspects = (prevStep, currStep) => {
    const prevProspects = prevStep.prospects;
    const currProspects = currStep.prospects;
    const combineProspects = [...prevProspects, ...currProspects];
    console.log(combineProspects)
    const uniqueProspects = combineProspects.filter(
      (prospect, idx) => combineProspects.map(obj => obj.id).indexOf(prospect.id) === idx);
    console.log(uniqueProspects)
    currStep.prospects = uniqueProspects;
  }

  const handleImportProspects = (event, currStep, idx) => {
    const prevStep = campaign.steps[idx-1];
    const data = {
      'prev_step_id' : prevStep.id,
      'curr_step_id' : currStep.id
    }
    apiRequest('POST', `/steps/prospects`, data)
    .then(res => {
      if(res) {
        mergeStepProspects(prevStep, currStep);
        setImportSuccess(true);
      }
    })
    .catch(err => {
      console.log(err.message);
    });

    event.stopPropagation();
  }

  const handleExecuteStep = (event, step) => {
    apiRequest('POST', `/steps/${step.id}/send`)
    .then((json) => {
      setExecuteSuccess(true);
    })
    .catch( (e) => {
      console.log(e);
    });
    event.stopPropagation();
  }

  const setCurrentViewToSummary = () => {
    setCurrentView('summary')
  }

  const setCurrentViewToProspects = () => {
    setCurrentView('prospects')
  }

  //handle select all row on DataTable.js
  const handleClickOnAllRows = event => {
    if (event.target.checked) {
      const newSelecteds = prospects.map(n => n.id);
      handleSelectedProspects(newSelecteds);
      return;
    }
    handleSelectedProspects([]);
  };

  //handle select one row on DataTable.js
  const handleClickOnRow = (event, id) => {
    const selectedIndex = selectedProspects.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProspects, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProspects.slice(1));
    } else if (selectedIndex === selectedProspects.length - 1) {
      newSelected = newSelected.concat(selectedProspects.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProspects.slice(0, selectedIndex),
        selectedProspects.slice(selectedIndex + 1),
      );
    }
    handleSelectedProspects(newSelected);
  };

  let display = null;

  if (currentView === 'summary') {
    display = (
      <Fragment>
        {/* Page headings, campaign summary, and steps display */}
        <CampaignSummary title={campaign.title}
          campaignId={campaign.id}
          userName={campaign.userName}
          prospects={campaign.prospectsTotal}
          contacted={campaign.prospectsContacted}
          replied={campaign.prospectsReplied}
          steps={campaign.steps}
          handleProspectsClick={handleImportProspects}
          handleExecuteClick={handleExecuteStep}
          openEditStepDialog={handleEditOpen} />
        {/* Edit dialog */}
        <StepDialog title="Edit Step"
          open={editOpen}
          onClose={handleEditClose}
          onSave={handleEditSave}
          step={editStep}
          delete={true}
          findTemplate={findTemplate}
          updateTemplate={updateTemplate}
          onDeleteClick={handleDelete}
          setTemplateId={setTemplateId}
          setTemplates={setTemplates}
          templates={templates} />
        {/* New step dialog */}
        <StepDialog title="New Step"
          open={newOpen}
          onClose={handleNewClose}
          onSave={handleNewSave}
          delete={false}
          findTemplate={findTemplate}
          updateTemplate={updateTemplate}
          setTemplateId={setTemplateId}
          setTemplates={setTemplates}
          onNewTemplate={handleNewTemplate}
          templates={templates} />
        <Button onClick={handleNewOpen} className={classes.mt1b3} variant="outlined">Add Step</Button>
        <SuccessSnackbar open={importSuccess} onClose={importSuccessClose} message={"Success"}/>
        <SuccessSnackbar open={executeSuccess} onClose={executeSuccessClose} message={"Executing step..."}/>
        <ConfirmationDialog open={confirmOpen}
          onClose={confirmClose}
          onConfirm={deleteStep} />
      </Fragment>
    )
  }

  if (currentView === 'prospects') {
    display = (
      <Fragment>
        <StepsTabs steps={campaign.steps}/>
        <UserInputContainer className={classes.prospectList}>
          <DataTable
            data={prospects}
            handleClickOnAllRows={handleClickOnAllRows}
            handleClickOnRow={handleClickOnRow}
            selectedProspects={selectedProspects}
            ></DataTable>
        </UserInputContainer>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <NavBar userName={campaign.userName}/>
      <Grid container className={classes.sidePanelContainer}>
        <Grid item lg={2} sm={12} xs={12} id='sidePanel' className="half_container">
          <CampaignSidePanel
            currentView={currentView}
            setCurrentViewToSummary={setCurrentViewToSummary}
            setCurrentViewToProspects={setCurrentViewToProspects}
            >
          </CampaignSidePanel>
        </Grid>
        <Grid item lg={10} sm={12} xs={12} className="half_container">
          <Container className={classes.container}>
          <CampaignHeader title={campaign.title} userName={campaign.userName}/>
            {display}
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Campaign;