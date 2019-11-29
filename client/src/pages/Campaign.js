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

const useStyles = makeStyles( () => ({
  container: {
    marginTop: '100px'
  },
  mt1b3: {
    marginTop: '1rem',
    marginBottom: '3rem'
  }
}));

// sample campaign, data to be removed
const emptyCampaign = {
  id: 1,
  title: 'My First Campaign',
  userName: 'John Doe',
  prospectsTotal: 234,
  prospectsContacted: 123,
  prospectsReplied: 34,
  steps: [
    {
      id: 1,
      templateId: 1,
      templateName: 'First template',
      sent: 123,
      replied: 23
    }
  ],
  templates: [
    {
      id: 1,
      name: 'First template'
    },
    {
      id: 2,
      name: 'Second template'
    }
  ]
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
  const [newStep, setNewStep] = useState(emptyStep);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect( () => {

    getCampaign();

  }, []);

  const findStepIndex = (step) => {
    for(let i=0; i<campaign.steps.length; i++) {
      if(campaign.steps[i].id === step.id) return i;
    }
    return -1;
  }

  const findTemplate = (id) => {
    for(let template of campaign.templates) {
      if(template.id === id) return template;
    }
    return {};
  }

  const getCampaign = async () => {
    /**
     * get from server:
     *   id
     *   title
     *   userName
     *   prospectsTotal
     *   prospectsContacted
     *   prospectsReplied
     *   steps {list}:
     *     id
     *     templateId
     *     sent
     *     replied
     *   templates {list}:
     *     id
     *     name
     */   

    // add template names to steps in campaign
    // setCampaign(thisCampaign);
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

  const addStep = (step) => {
    console.log('Add: ' + JSON.stringify(step));
    // update UI
    // fill in template name, sent, and replied
    step.templateName = findTemplate(step.templateId).name;
    step.sent = 0;
    step.replied = 0;
    // append step to campaign
    campaign.steps.push(step);
    setCampaign(campaign);

    /** 
     * TODO:
     * update server
     * create new step with campaign_id=campaign.id
     * and template_id=step.templateId
     * 
     * add step id after request 
     * (can't update without id, but can't know id until request)
     */
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

  const handleNewOpen = () => {
    setNewStep(emptyStep);
    setNewOpen(true);
  }

  const handleNewClose = () => {
    setNewOpen(false);
  }

  const handleNewSave = () => {
    addStep(newStep);
    setNewOpen(false);
  }

  const handleSetNewStep = (newStep) => {
    setNewStep(newStep);
  }

  const handleDelete = () => {
    setConfirmOpen(true);
  }

  const confirmClose = () => {
    setConfirmOpen(false);
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
                    templates={campaign.templates} />
        {/* New step dialog */}
        <StepDialog title="New Step"
                    open={newOpen}
                    onClose={handleNewClose}
                    onSave={handleNewSave}
                    step={newStep}
                    delete={false}
                    setStep={handleSetNewStep}
                    templates={campaign.templates} />
        <Button onClick={handleNewOpen} className={classes.mt1b3} variant="outlined">Add Step</Button>
        <ConfirmationDialog open={confirmOpen}
                            onClose={confirmClose}
                            onConfirm={deleteStep} />
      </Container>
    </Fragment>
  )
}

export default Campaign;