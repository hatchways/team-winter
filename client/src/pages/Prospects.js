import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CloudIcon from '@material-ui/icons/Cloud';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import { SampleData } from '../pages/sampledata';

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

  const prepareData = () => {
    const results = [];

    //replace data with real data
    const data = SampleData();
    const cloudIcon = <CloudIcon className="fas fa-cloud" style={{color: "grey"}} />
    data.map(each => {
      const obj = {
        'check': 'check',
        'Email': each.email,
        cloudIcon,
        'Status': 'working',
        'Owner': each.owner,
        'Campaigns': each.campaigns,
        'Last Contacted': each.lastContacted,
        'Emails...': each.emails
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
            <Typography variant="h5"> Prospects </Typography>
          </Box>
          <Box className={classes.icon}>
            <FlashOnIcon fontSize="small" style={{color: "grey"}} />
          </Box>
          <Box className={classes.icon}>
            <MailIcon fontSize="2px" style={{color: "grey"}} />
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
                <ArrowDropDownIcon fontSize="smaller" style={{color: "white"}} pt={3} />
              </div>
            </CustomizedButton>
          </Box>
        </Box>
      </div>
      <Box className="classes.tagsContainer" display="flex" justifyContent="center">
      </Box>
      <UserInputContainer className={classes.prospectList}>
        <DataTable data={dataToRender}></DataTable>
      </UserInputContainer>
    </Fragment>
  )
}

export default Prospects;