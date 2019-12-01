import React, { Fragment } from 'react';
import { 
  makeStyles,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
} from '@material-ui/core';

import MailIcon from '@material-ui/icons/Mail';

import CustomizedButton from '../CustomizedButton';



const useStyles = makeStyles( () => ({
  mt1: {
    marginTop: '1rem'
  },
  mt2b1: {
    marginTop: '2rem',
    marginBottom: '1rem'
  },
  statisticBox: {
    margin: '10px'
  },
  statisticValue: {
    fontSize: '200%',
    color: '#4FBE75'
  },
  stepPaper: {
    marginTop: '1rem',
    '&:hover, &:focus': {
      backgroundColor: '#fcfcfc',
      cursor: 'pointer'
    }
  },
  mailIcon: {
    fontSize: '200%',
    color: '#4FBE75'
  },
  stepNumber: {
    margin: '20px 20px 20px 35px'
  },
  addProspectsButton: {
    float: 'right'
  },
  verticalDivider: {
    borderColor: '#EDECF2',
    height: '55px',
    width: '2px',
  },
  stepVerticalDivider: {
    borderColor: '#EDECF2',
    height: '55px',
    width: '2px',
    margin: '0 auto'
  }
}));

const VerticalDivider = (props) => {

  const classes = useStyles();

  return (
    <Divider className={props.step ? classes.stepVerticalDivider : classes.verticalDivider} orientation="vertical" />
  )

}

const CampaignHeader = (props) => {

  const classes = useStyles();

  return (
    <Grid container item
          direction="row"
          justify="space-between"
          alignItems="center" >
      <Grid container item
            direction="column"
            justify="center"
            alignItems="flex-start"
            xs={12}
            sm={8} >
        <Grid item>
          <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item>
          <Typography component="p">by {props.userName}</Typography>
        </Grid>
      </Grid>
      <Grid item
            xs={12}
            sm={4} >
        <CustomizedButton className={classes.addProspectsButton}>Add Prospects</CustomizedButton>
      </Grid>
    </Grid>
  )

}

const CampaignDataDisplay = (props) => {

  const classes = useStyles();

  return (
    <Paper className={classes.mt2b1}>
      <Grid container item
            direction="row"
            justify="space-evenly"
            alignItems="center">
        <Grid item>
          <StatisticDisplay label="Prospects"
                            value={props.prospects} />
        </Grid>
        <VerticalDivider />
        <Grid item>
          <StatisticDisplay label="Contacted"
                            value={props.contacted} />
        </Grid>
        <VerticalDivider />
        <Grid item>
          <StatisticDisplay label="Replied"
                            value={props.replied} />
        </Grid>
      </Grid>
    </Paper>
  )

}

const StepsDisplay = (props) => {

  const classes = useStyles();

  return (
    props.steps.map( (step, idx) => {
      return (
        <Paper key={idx} className={classes.stepPaper} onClick={() => props.openEditStepDialog(idx)} >
          <Grid item container
                direction="row"
                justify="space-evenly"
                alignItems="center" >
            <Grid item sm={1}>
              <Typography className={classes.stepNumber} variant="h6">{idx+1}</Typography>
            </Grid>
            <Grid item sm={1}>
              <MailIcon className={classes.mailIcon} />
            </Grid>
            <Grid item sm={5}>
              <Typography>{step.templateName}</Typography>
            </Grid>
            <Grid item sm={2}>
              <StatisticDisplay label="Sent"
                                value={step.sent} />
            </Grid>
            <Grid item sm={1}>
              <VerticalDivider step={true} />
            </Grid>
            <Grid item sm={2}>
              <StatisticDisplay label="Replied"
                                value={step.replied} />
            </Grid>
          </Grid>
        </Paper>
      )
    })
  )
}

const StatisticDisplay = (props) => {

  const classes = useStyles();

  return (
    <Box className={classes.statisticBox}>
      <Typography align="center" className={classes.statisticLabel}>{props.label}</Typography>
      <Typography align="center" className={classes.statisticValue}>{props.value}</Typography>
    </Box>
  )

}

const CampaignSummary = (props) => {

  return (
    <Fragment>
      <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch" >
        {/* Campaign name and controls */}
        <CampaignHeader title={props.title}
                        userName={props.userName} />
        {/* Campaign Data */}
        <CampaignDataDisplay prospects={props.prospects} 
                             contacted={props.contacted}
                             replied={props.replied} />
        {/* Steps */}
        <StepsDisplay steps={props.steps}
                      openEditStepDialog={props.openEditStepDialog} />
      </Grid>
    </Fragment>
  )
}

export default CampaignSummary;