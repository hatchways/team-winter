import React, { Fragment, useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CustomizedButton from '../features/CustomizedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import CampaignDialog from '../features/CampaignDialog';
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

const Campaigns = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false); 
  const [id, setId] = useState(0);
  const [campaigns, setCampaigns] = useState([{}]);

  useEffect(() => {
    getUserCampaigns();
  }, []);

  if(id) {
    return <Redirect to="/campaigns/{id}" />
  }

  const handleClickOnRow = (event, id) => {
    setId(id);
  };
  const propsForDataTable = {
    data: campaigns,
    handleClickOnRow
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getUserCampaigns();
  };

  const handleCampaigns = data => {
    const campaigns = [];
    for(const each of data.Campaigns) {
      const campaign = {
        id : each.id,
        Name: each.name,
        Created: each.creation_date,
        Prospects: each.prospects,
        Replies: "",
        Steps: each.steps,
        Due: ""
      }
      campaigns.push(campaign);
    }
    setCampaigns(campaigns);
  }

  const test = () => {
    console.log('yay')
  }

  const getUserCampaigns = async () => {

    await fetch('/campaigns', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getJWT()}`
      }
    })
    .then(res => res.json())
      .then(data => {handleCampaigns(data)})
    .catch(err => {
      console.log(err.message);
    });
  }


  

  return (
    <Fragment>
      <NavBar />
      <div>
        <Box className={classes.featuresContainer}  display="flex">
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
        <DataTable props={propsForDataTable} ></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default Campaigns;