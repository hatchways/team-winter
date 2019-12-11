import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { apiRequest } from '../utils';


export default function CampaignDialog(props) {
  const {campaigns, open, onClose} = props;

  const [name, handleName] = useState("");

  const onCreate = (campaign) => {
    campaigns.push(
    {
      id : campaign.id,
      Name: campaign.name,
      Created: campaign.creation_date,
      Prospects: campaign.prospects,
      Replies: "",
      Steps: campaign.steps,
      Due: "",
      link: "/campaigns/" + campaign.id 
    })
    onClose();
  }
  
  const handleCreate = () => {
  
    apiRequest('POST', '/campaigns', {'name' : name})
      .then(data => {
        onCreate(data.campaign);
      })
    .catch(err => {
      console.log(err.message);
    });
  } 
   
  
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-campaign">
      <DialogContent>
         <DialogTitle>Create a Campaign</DialogTitle>
        <TextField
            autoFocus
            type='text'
            label="Campaign name"
            onChange={e => handleName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        <DialogActions>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
