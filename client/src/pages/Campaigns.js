import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CustomizedButton from '../features/CustomizedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import { SampleData } from '../pages/sampledata2';

import { getJWT } from '../utils';

const useStyles = makeStyles((theme) => ({
  createCampaignButton: {
    width: 210,
    fontSize: 14,
  },
  icon: {
    margin: "16px 17px 0px 14px",
  },
  featuresContainer:{
    padding: "100px 60px 30px",
  },
  campaignList: {
    overflow: "auto",
    width: "100%",
    height: 600,
    marginTop: 0,
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 12,
      paddingRight: 15,
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    }
  }
}));

function CampaignDialog(props) {
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


const Campaigns = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false); 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const prepareData = () => {
    const results = [];

    //replace data with real data
    const data = SampleData();
    data.map(each => {
      const obj = {
        'Name': each.name,
        'Created': 'working',
        'Prospects': each.prospects,
        'Replies': each.replies,
        'Steps': each.steps,
        'Due': each.due
      }
      return results.push(obj)
    })
    return results;
  }

  const dataToRender = prepareData();

  return (
    <Fragment>
      <NavBar />
      <div>
        <Box className={classes.featuresContainer} display="flex">
          <Box flexGrow={1}>
            <Typography variant="h5"> Campaigns </Typography>
          </Box>
          <Box className={classes.icon}>
            <FlashOnIcon fontSize="small" style={{color: "grey"}} />
          </Box>
          <Box className={classes.icon}>
            <MailIcon fontSize="2px" style={{color: "grey"}} />
          </Box>
          <Box>
            <CustomizedButton 
              className={classes.createCampaignButton}
              onClick={handleClickOpen}>
              Create Campaign
            </CustomizedButton>
          </Box>
        </Box>
        <CampaignDialog open={open} onClose={handleClose}/>
      </div>
      <Box className="tagsContainer" display="flex" justifyContent="center">
      </Box>
      <UserInputContainer className={classes.campaignList}>
        <DataTable data={dataToRender}></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default Campaigns;