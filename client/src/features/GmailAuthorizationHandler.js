import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';

import { getJWT } from '../utils';


const AUTHORIZATION_URL = 'http://localhost:5000/gmail/authorize';

function GmailAuthorizationHandler(props) {

  const [open, setOpen] = useState(false);
  const [gmailAddress, setGmailAddress] = useState('');
  const [authStage, setAuthStage] = useState('progress');

  const qs = queryString.parse(window.location.search);

  const doAuthorization = async (code, state) => {
    const response = await fetch(AUTHORIZATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${getJWT()}`
      },
      body: JSON.stringify({
        'code': code,
        'state': state
      })
    });
    if(response.status === 200) {
      return response.json()['gmail_address'];
    }
    else {
      throw new Error('Could not complete authorization.');
    }
  }

  useEffect( () => {

    if(qs.code && qs.state) {
      setOpen(true);
      doAuthorization(qs.code, qs.state)
      .then( (address) => {
        setGmailAddress(address);
        setAuthStage('complete');
        setOpen(true);
      })
      .catch( (e) => {
        setAuthStage('error');
        console.log(e);
      });
    }

  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  const contentInProgress = <CircularProgress />;

  const contentComplete = (
    <div>
      <DialogTitle>
        Success
      </DialogTitle>
      <DialogContentText>
        Connected Gmail account: {gmailAddress}
      </DialogContentText>
      <DialogActions>
        <Button aria-label="close-dialog" onClick={handleClose} color="primary" >
          Continue
        </Button>
      </DialogActions>
    </div>
  );

  const contentError = (
    <div>
      <DialogTitle>
        Error
      </DialogTitle>
      <DialogContentText>
        Could not complete Google authorization.
      </DialogContentText>
      <DialogActions>
        <Button aria-label="close-dialog" onClick={handleClose} color="primary" >
          Continue
        </Button>
      </DialogActions>
    </div>
  );

  return (
    <Dialog aria-labelledby="connect-gmail-account" 
            open={open}
            >
      <DialogContent>
        {
          authStage === 'progress' ? contentInProgress : authStage === 'complete' ? contentComplete : contentError
        }
      </DialogContent>
    </Dialog>
  )

}

export default GmailAuthorizationHandler;