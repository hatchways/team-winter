import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getJWT } from '../utils';


export default function CampaignDialog(props) {
    const { open, onClose} = props;
    const [name, handleName] = useState("");
  
    const handleClose = () => {
      onClose();
    }; 
  
    const handleCreate = async () => {
  
      const data = {
        'name': name
      };
      
      try {
        const response = await fetch('http://localhost:5000/campaigns', {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${getJWT()}`
          },
          body: JSON.stringify(data)
        }); 
        if(response.status === 201) {
          console.log('Campaign Created');
          onClose();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="create-campaign">
        <DialogContent>
          <DialogTitle>Create a Campaign</DialogTitle>
          <DialogContentText>Enter a name</DialogContentText>
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
