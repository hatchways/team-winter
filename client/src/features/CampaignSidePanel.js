import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LensIcon from '@material-ui/icons/FiberManualRecord';

import CustomizedButton from './CustomizedButton';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    [theme.breakpoints.down("md")]: {
      height: "10vh",
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "78vh",
      height: "90%",
    }
  },
  lensIcon: {
    color: "#a5d6a7",
    fontSize: 10,
    padding: 10,
  },
  activeButton: {
    margin: "10px 20px",
    width: 170,
    height: 40,
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  unactiveButton: {
    margin: "10px 50px",
    width: 100,
    height: 40,
    justifyContent: "flex-start",
    '&:hover': {
      background: "none"
    },
  }
}));

const CampaignSidePanel = (props) => {
  const {currentView, setCurrentViewToSummary, setCurrentViewToProspects} = props;
  const classes = useStyles();

  let display = null;
  if (currentView === 'summary') {
    display = (
      <Fragment>
        <CustomizedButton className={classes.activeButton}> <LensIcon className={classes.lensIcon} /> Summary </CustomizedButton>
        <Button component="span" className={classes.unactiveButton} onClick={() => setCurrentViewToProspects()}>Prospects</Button>
      </Fragment>
    )
  }
  
  if (currentView === 'prospects') {
    display = (
      <Fragment>
        <Button component="span" className={classes.unactiveButton} onClick={() => setCurrentViewToSummary()}>Summary</Button>
        <CustomizedButton className={classes.activeButton}> <LensIcon className={classes.lensIcon} /> Prospects </CustomizedButton>
      </Fragment>
    )
  }
 
  return (
    <Paper className={classes.root}>
      {display}
    </Paper>
  );
}

export default CampaignSidePanel;
