import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import MailIcon from '@material-ui/icons/Mail';

import CustomizedButton from './CustomizedButton';


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
  mailIcon: {
    fontSize: '200%',
    color: '#4FBE75'
  },
  stepNumber: {
    margin: '20px'
  },
  addProspectsButton: {
    float: 'right'
  },
  verticalDivider: {
    borderColor: '#EDECF2',
    height: '55px',
    width: '2px'
  }
}));

const VerticalDivider = () => {

  const classes = useStyles();

  return (
    <Divider className={classes.verticalDivider} orientation="vertical" />
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

const TemplateSelector = (props) => {

  const classes = useStyles();

  return (
    <MailIcon className={classes.mailIcon} />
  )

}

const StepsDisplay = (props) => {

  const classes = useStyles();

  return (
    props.steps.map( (step, idx) => {
      return (
        <Paper key={idx} className={classes.mt1}>
          <Grid item container
                direction="row"
                justify="space-evenly"
                alignItems="center" >
            <Grid item >
              <Typography className={classes.stepNumber} variant="h6">{idx}</Typography>
            </Grid>
            <Grid item >
              <TemplateSelector id={step.templateId} />
            </Grid>
            <Grid item >
              <Typography>{step.templateName}</Typography>
            </Grid>
            <Grid item>
              <StatisticDisplay label="Sent"
                                value={step.sent} />
            </Grid>
            <VerticalDivider />
            <Grid item>
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

  const classes = useStyles();

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
        <StepsDisplay steps={props.steps} />
      </Grid>
      <Button className={classes.mt1} variant="outlined">Add Step</Button>
    </Fragment>
  )
}

export default CampaignSummary;