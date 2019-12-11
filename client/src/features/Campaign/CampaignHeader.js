import React, { Fragment } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

import CustomizedButton from '../CustomizedButton';

const useStyles = makeStyles( () => ({
  addProspectsButton: {
    float: 'right'
  },
}));

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
export default CampaignHeader;