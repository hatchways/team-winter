import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';

import { apiRequest } from '../utils';

function GmailAuthorizationHandler(props) {

  const [open, setOpen] = useState(false);
  const [gmailAddress, setGmailAddress] = useState('');
  const [authStage, setAuthStage] = useState('progress');

  useEffect( () => {

    const qs = queryString.parse(window.location.search);

    if(qs.code && qs.state) {
      setOpen(true);
      apiRequest('POST', '/gmail/authorize', {'code': qs.code, 'state': qs.state})
      .then( (json) => {
        setGmailAddress(json['gmail_address']);
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