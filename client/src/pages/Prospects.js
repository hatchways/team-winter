import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import queryString from 'query-string';

import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';
import DataTable from '../features/DataTable';
import GmailDialog from '../features/GmailDialog';

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
    marginBottom: 6,
  },
  icon: {
    margin: "16px 17px 0px 14px",
  },
  featuresContainer:{
    padding: "40px 60px 0px",
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

  const gmailDialogShouldOpen = () => {
    const qs = queryString.parse(window.location.search);
    if(qs['gmail_dialog']) return true;
    return false;
  }

  return (
    <Fragment>
      <NavBar />
      <div>
        <Box className={classes.featuresContainer} display="flex">
          <Box flexGrow={1}>
            <Typography variant="h5"> Prospects </Typography>
          </Box>
          <Box className={classes.icon}>
            <i className="fas fa-bolt" style={{color: "grey"}}></i>
          </Box>
          <Box className={classes.icon}>
            <i className="fas fa-envelope" style={{color: "grey"}}></i>
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
                <i className="fas fa-sort-down fa-sm" style={{color: "white"}}></i>
              </div>
            </CustomizedButton>
          </Box>
        </Box>
      </div>
      <Box className="tagsContainer" display="flex" justifyContent="center">
      </Box>
      <UserInputContainer className={classes.prospectList}>
        <DataTable></DataTable>
      </UserInputContainer>
      <GmailDialog open={gmailDialogShouldOpen()} />
    </Fragment>
  )
}

export default Prospects;