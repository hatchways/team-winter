import React, { Fragment, useState, useEffect } from 'react';
import { 
  makeStyles,
  Container,
  Button
 } from '@material-ui/core';
import NavBar from '../features/NavBar/MainBody';
import CampaignSummary from '../features/Campaign/CampaignSummary';
import StepDialog from '../features/Campaign/StepDialog';
import ConfirmationDialog from '../features/ConfirmationDialog';
import SuccessSnackbar from '../features/SuccessSnackbar';
import { apiRequest } from '../utils';

const useStyles = makeStyles( () => ({
  container: {
    marginTop: '100px'
  },
  mt1b3: {
    marginTop: '1rem',
    marginBottom: '3rem'
  }
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

  useEffect( () => {
    getCampaign();
    getTemplates();
  }, []);

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

  const handleSetEditStep = (newStep) => {
    setEditStep(newStep);
  }
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
    apiRequest('POST', '/gmail/send', {'step_id': step.id})
    .then((json) => {
      setExecuteSuccess(true);
    })
    .catch( (e) => {
      console.log(e);
    });
    event.stopPropagation();
  }

  return (
    <Fragment>
      <NavBar />
      <Container className={classes.container}>
        {/* Page headings, campaign summary, and steps display */}
        <CampaignSummary title={campaign.title}
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
                    setStep={handleSetEditStep}
                    delete={true}
                    onDeleteClick={handleDelete}
                    templates={templates} />
        {/* New step dialog */}
        <StepDialog title="New Step"
                    open={newOpen}
                    onClose={handleNewClose}
                    onSave={handleNewSave}
                    delete={false}
                    setTemplateId={setTemplateId}
                    templates={templates} />
        <Button onClick={handleNewOpen} className={classes.mt1b3} variant="outlined">Add Step</Button>
        <SuccessSnackbar open={importSuccess} onClose={importSuccessClose} message={"Success"}/>
        <SuccessSnackbar open={executeSuccess} onClose={executeSuccessClose} message={"Executing step..."}/>
        <ConfirmationDialog open={confirmOpen}
                            onClose={confirmClose}
                            onConfirm={deleteStep} />
      </Container>
    </Fragment>
  )
}

export default Campaign;