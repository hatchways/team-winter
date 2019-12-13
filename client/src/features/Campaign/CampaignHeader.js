import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { Link} from "react-router-dom";
import CustomizedButton from '../CustomizedButton';

const useStyles = makeStyles(({
  addProspectsButton: {
    float: 'right'
  },
  userName: {
    padding: "10px 0px",
  },
  buttonText: {
    color: "white",
    textDecoration: "none",
  }
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
            sm={8}>
        <Grid item>
          <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.userName}
            component="p"
            >
            by {props.userName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item
            xs={12}
            sm={4}>
            <CustomizedButton
              className={classes.addProspectsButton}
              >
              <Link className={classes.buttonText} to="/prospects">Add Prospects</Link>
            </CustomizedButton>
      </Grid>
    </Grid>
  )
}
export default CampaignHeader;

