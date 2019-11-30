import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import imageEnabled from '../images/btn_google_signin_dark_normal_web.png';
import imageDisabled from '../images/btn_google_signin_dark_disabled_web.png';

import { apiRequest } from '../utils';

const useStyles = makeStyles({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

function GmailDialog(props) {

  const classes = useStyles();

  const [open, setOpen] = useState(props.open);
  const [image, setImage] = useState(imageDisabled);
  const [googleAuthURL, setGoogleAuthURL] = useState('');

  useEffect( () => {

    // check if the user has a connected gmail account
    apiRequest('GET', '/gmail/get_address')
    .then( (json) => {
      //no connected gmail for this user
      if(!json['gmail_address'] && props.open) {
        // open the dialog
        setOpen(true);
        // get the auth URL
        apiRequest('GET', '/gmail/get_auth_url')
        .then( (json) => {
          setGoogleAuthURL(json['auth_url']);
          setImage(imageEnabled);
        })
        .catch( (e) => {
          console.log(e);
        });
      }
    })
    .catch( (e) => {
      console.log(e);
    });
  }, [props.open]);

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
          <a onClick={(e) => !googleAuthURL ? e.preventDefault() : null} href={googleAuthURL}>
            <img src={image} alt="sign in with Google" />
          </a>
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