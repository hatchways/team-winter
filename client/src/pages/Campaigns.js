import React, { Fragment, useState, useEffect} from 'react';
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
import { apiRequest } from '../utils';

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
  const [campaigns, setCampaigns] = useState([{}]);

  useEffect(() => {
    getUserCampaigns();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCampaigns = data => {
    const campaigns = [];
    for(const each of data.campaigns) {
      const campaign = {
        id : each.id,
        Name: each.name,
        Created: each.creation_date,
        Prospects: each.prospects,
        Replies: "",
        Steps: each.steps,
        Due: "",
        link: "/campaigns/" + each.id,
        arrow: 'arrow'
      }
      campaigns.push(campaign);
    }
    setCampaigns(campaigns);
  }

  const getUserCampaigns = () => {
    apiRequest('GET', '/campaigns')
      .then(data => handleCampaigns(data))
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
        <CampaignDialog campaigns={campaigns} open={open} onClose={handleClose}/>
      </div>
      <Box className="tagsContainer" display="flex" justifyContent="center">
      </Box>
      <UserInputContainer className={classes.campaignList}>
        <DataTable data={campaigns} ></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default Campaigns;
