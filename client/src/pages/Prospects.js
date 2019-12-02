import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import queryString from 'query-string';

import CloudIcon from '@material-ui/icons/Cloud';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import GmailDialog from '../features/GmailDialog';
import CustomizedDialog from '../features/CustomizedDialog'
import SampleData from '../pages/sampledata';


const useStyles = makeStyles((theme) => ({
  importButton: {
    backgroundColor: "#EDECF2",
    width: 150,
    height: 50,
  },
  newProspectButton: {
    width: 210,
    fontSize: 14,
  },
  seperationLine: {
    height: 26,
    borderLeft: "#EDECF2 0.08rem solid",
    margin: "3px 15px",
  },
  arrow: {
    marginTop: 6,
  },
  icon: {
    margin: "16px 17px 0px 14px",
  },
  featuresContainer:{
    padding: "100px 60px 30px",
  },
  prospectList: {
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

const Prospects = () => {
  const classes = useStyles();
  const [prospects, handlelistOfProspects] = useState([]);
  const [dialog, handleDialog] = useState(null);
  const [campaigns, handleCampaigns] = useState(null);
  const [campaignId, setCampaignId] = useState('');

  useEffect(() => {
    getAllCampaigns();
  }, [])

  // Need to replace hard code user with JWT token 
  const user = 1

  const gmailDialogShouldOpen = () => {
    const qs = queryString.parse(window.location.search);
    if(qs['gmail_dialog']) return true;
    return false;
  }
  
  const getAllCampaigns = () => {
    fetch(`/campaigns/${user}`)
    .then(res => res.json())
      .then(data => {
        handleCampaigns(data.Campaigns)
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const handleCloseDialogAndSaveProspects = () => {
    handleDialog(false)
    saveProspectsToCampaign()
  } 

  const saveProspectsToCampaign = () => {
    const data = {
      "prospect_ids": prospects,
    };

    fetch(`/campaign/${campaignId}/prospects`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
      .then(data => {
        console.log(data.message);
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const formatData = () => {
    const results = [];

    //replace data with real data
    //id, email, name, status, owner_id, tags
    const data = SampleData;
    const cloudIcon = <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />
    data.map(each => {
      const obj = {
        'id': each.id,
        'check': 'check',
        'Email': each.email,
        cloudIcon,
        'Status': 'working',
        'Owner': each.name,
        'Campaigns': each.campaigns,
        'Last Contacted': each.lastContacted,
        'Emails...': each.emails
      }
      return results.push(obj)
    })
    return results;
  }
  
  const dataToRender = formatData();

  const actionType = 'Add to Campaign'

  const propsForDialog = {
    actionType,
    dialog,
    campaigns,
    setCampaignId,
    campaignId,
    handleCloseDialogAndSaveProspects
  }

  return (
    <Fragment>
      <NavBar />
      <div>
        <Box
          className={classes.featuresContainer}
          display="flex">
          <Box flexGrow={1}>
            <Typography variant="h5"> Prospects </Typography>
          </Box>
          <Box flexGrow={1}>
          {prospects.length > 0 &&
            <CustomizedButton
              onClick={() => handleDialog(true)}>
              {actionType}
            </CustomizedButton>}
          </Box>
            {dialog === true &&
              <CustomizedDialog
              propsForDialog={propsForDialog}
              />}
          <Box className={classes.icon}>
            <FlashOnIcon fontSize="small" style={{color: "grey"}} />
          </Box>
          <Box className={classes.icon}>
            <MailIcon fontSize="small" style={{color: "grey"}} />
          </Box>
          <Box pl={2}>
            <OutlinedButton className={classes.importButton}> Imports </OutlinedButton>
          </Box>
          <Box pl={1}>
            <CustomizedButton 
              className={classes.newProspectButton}>
              Add New Prospect
              <div className={classes.seperationLine}></div>
              <div className={classes.arrow} >
                <ArrowDropDownIcon fontSize="small" style={{color: "white"}} pt={3} />
              </div>
            </CustomizedButton>
          </Box>
        </Box>
      </div>
      <Box className="classes.tagsContainer" display="flex" justifyContent="center">
      </Box>
      <UserInputContainer className={classes.prospectList}>
        <DataTable
          data={dataToRender}
          func={handlelistOfProspects}
          >
        </DataTable>
      </UserInputContainer>
      <GmailDialog open={gmailDialogShouldOpen()} />
    </Fragment>
  )
}

export default Prospects