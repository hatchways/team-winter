import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloudIcon from '@material-ui/icons/Cloud';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import { apiRequest } from '../utils';


export default function ProspectDialog(props) {
  const {prospects, open, onClose} = props;

  const [email, handleEmail] = useState("");
  const [name, handleName] = useState("");

  const onCreate = (prospect) => {
    const cloudIcon = <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />
    prospects.push(
    {
        'id': prospect.id,
        'check': 'check',
        'Email': prospect.email,
        cloudIcon,
        'Status': prospect.status,
        'Owner': prospect.name,
        'Campaigns': prospect.campaigns,
        'Imported_from': ''
    })
    onClose();
  }
  
  const handleCreate = () => {
    apiRequest('POST', '/prospects', {'email' : email, 'name' : name})
      .then(data => {
        onCreate(data.prospect);
      })
    .catch(err => {
      console.log(err.message);
    });
  } 
   
  
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-prospect">
      <DialogContent>
         <DialogTitle>Create a Propsect</DialogTitle>
         <Box display="flex" flexDirection="column">
            <TextField
                autoFocus
                type='text'
                label="Prospect email"
                onChange={e => handleEmail(e.target.value)}
                margin="normal"
                variant="outlined"
            />
            <TextField
                type='text'
                label="Prospect name"
                onChange={e => handleName(e.target.value)}
                margin="normal"
                variant="outlined"
            />
        </Box>
        <DialogActions>
          <Button onClick={handleCreate} variant="outlined" color="primary">
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
