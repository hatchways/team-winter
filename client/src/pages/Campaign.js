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
import { getJWT, apiRequest } from '../utils';
import SuccessSnackbar from '../features/SuccessSnackbar';

const useStyles = makeStyles( () => ({
  container: {
    marginTop: '100px'
  },
  mt1b3: {
    marginTop: '1rem',
    marginBottom: '3rem'
  }
}));


const emptyCampaign = {
  id: -1,
  title: null,
  userName: null,
  prospectsTotal: null,
  prospectsContacted: null,
  prospectsReplied: null,
  steps: [],
}


const emptyStep = {
  templateId: ''
}

const Campaign = (props) => {

  const classes = useStyles();

  const [campaign, setCampaign] = useState(emptyCampaign);
  const [editOpen, setEditOpen] = useState(false);
  const [editStep, setEditStep] = useState({});
  const [newOpen, setNewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [templateId, setTemplateId] = useState(0);
  const [emailTemplates, setEmailTemplates] = useState([{}]);
  const [success, setSuccess] = useState(false);

  useEffect( () => {
    getCampaign();
    getEmailTemplates();
  }, []);

  const findStepIndex = (step) => {
    for(let i=0; i<campaign.steps.length; i++) {
      if(campaign.steps[i].id === step.id) return i;
    }
    return -1;
  }

  const findTemplate = (id) => {
    for(let template of emailTemplates) {
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
      templateId : stepData.email_template.id,
      templateName : stepData.email_template.name,
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
    console.log(steps);
  }

  const getCampaign = () => {
    const id = props.match.params.id;
    apiRequest('GET', `/campaigns/${id}`)
    .then( json => {
      handleCampaign(json);
    })
    .catch( e => {
      console.log(e);
    });
  }

  const handleEmailTemplates = templates => {
    const newEmailTemplates = [];
    for(let emailTemplate of templates) {
      newEmailTemplates.push({
        id : emailTemplate.id,
        name : emailTemplate.name,
        type : emailTemplate.type,
        subject : emailTemplate.subject,
        body : emailTemplate.body
      })
    }
    setEmailTemplates(newEmailTemplates);
  }

  const getEmailTemplates = async () => {
    apiRequest('GET', '/templates')
    .then( json => {
      handleEmailTemplates(json['templates']);
    })
    .catch( e => {
      console.log(e.message);
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

  const addNewStep = async () => {
    const id = campaign.id;
    const data = {
      id : templateId
    }
    await fetch(`/campaign/${id}/steps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${getJWT()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
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

  const handleNewTemplate = (template) => {
    const newEmailTemplates = [...emailTemplates];
    newEmailTemplates.push(template);
    setEmailTemplates(newEmailTemplates);
  }

//---------------Edit Step-----------------------//
  const handleEditOpen = (idx) => {
    setEditStep(campaign.steps[idx]);
    console.log(campaign.steps[idx]);
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

  const handleSuccessClose = () => {
    setSuccess(false);
  }

  const mergeStepProspects = (prevStep, currStep) => {
    const prevProspects = prevStep.prospects;
    const currProspects = currStep.prospects;
    const combineProspects = [...prevProspects, ...currProspects];
    const uniqueProspects = combineProspects.filter(
      (prospect, idx) => combineProspects.indexOf(prospect) === idx);
    currStep.prospects = uniqueProspects;
    console.log(currStep);
  }

  const handleImportProspects = (event, currStep, idx) => {
    console.log(currStep);
    const prevStep = campaign.steps[idx-1];
    const data = {
      'prev_step_id' : prevStep.id,
      'curr_step_id' : currStep.id
    }
    fetch(`/steps/prospects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${getJWT()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        mergeStepProspects(prevStep, currStep);
        setSuccess(true);
      }
    })
    .catch(err => {
      console.log(err.message);
    });

    event.stopPropagation();
  }

  const handleExecuteStep = (event) => {
    /**
     * TODO: 
     * Handle executing the step api
     * probably send request to send email.
     */
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
                    templates={emailTemplates}
                    onNewTemplate={handleNewTemplate} />
        {/* New step dialog */}
        <StepDialog title="New Step"
                    open={newOpen}
                    onClose={handleNewClose}
                    onSave={handleNewSave}
                    // step={newStep}
                    delete={false}
                    // setStep={handleSetNewStep}
                    setTemplateId={setTemplateId}
                    templates={emailTemplates}
                    onNewTemplate={handleNewTemplate} />
        <Button onClick={handleNewOpen} className={classes.mt1b3} variant="outlined">Add Step</Button>
        <SuccessSnackbar open={success} onClose={handleSuccessClose}/>
        <ConfirmationDialog open={confirmOpen}
                            onClose={confirmClose}
                            onConfirm={deleteStep} />
      </Container>
    </Fragment>
  )
}

export default Campaign;