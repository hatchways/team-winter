import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import imageEnabled from '../images/btn_google_signin_dark_normal_web.png';
import imageDisabled from '../images/btn_google_signin_dark_disabled_web.png';

import { getJWT } from '../utils';

const GMAIL_GET_AUTH_URL_URL = 'http://localhost:5000/gmail/get_auth_url';

const useStyles = makeStyles({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

function GmailDialog(props) {

  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [image, setImage] = useState(imageDisabled);
  const [googleAuthURL, setGoogleAuthURL] = useState('');

  useEffect( () => {
    const getURL = async () => {
      const response = await fetch(GMAIL_GET_AUTH_URL_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${getJWT()}`
        }
      });
      return await response.json();
    }
    const setURL = async () => {
      try {
        setGoogleAuthURL(await getURL());
      }
      catch(e) {
        console.log(e);
      }
    }
    setURL().then( () => {
      if(googleAuthURL) setImage(imageEnabled);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog aria-labelledby="connect-gmail-account" 
            open={open}
            disableBackdropClick={true}
            >
      <DialogContent>
        <DialogTitle>Connect a Gmail Account</DialogTitle>
        <DialogContentText>
          Connect a gmail account access all of MailSender's features.
        </DialogContentText>
        <div className={classes.imageContainer}>
          <a onClick={(e) => image === imageDisabled ? e.preventDefault() : null} href={googleAuthURL}><img src={image} alt="sign in with Google" /></a>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Skip
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default GmailDialog;