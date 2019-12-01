import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CustomizedButton from '../features/CustomizedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import { SampleData } from '../pages/sampledata2';
import CampaignDialog from '../features/CampaignDialog';


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
    console.log(results);
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
        <DataTable data={dataToRender} func={() => null} ></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default Campaigns;