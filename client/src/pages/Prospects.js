import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';

const useStyles = makeStyles(() => ({
  importButton: {
    backgroundColor: "#EDECF2",
    width: "150px",
    height: "50px"
  },
  newProspectButton: {
    width: 210,
    fontSize: "14px",
  },
  seperationLine: {
    height: "26px",
    borderLeft: "#EDECF2 0.08rem solid",
    margin: "3px 15px",
  },
  arrow: {
    marginBottom: "6px",
  },
  container: {
    padding: "40px",
  },
  bolt: {
    margin: "14px 0px 0px 940px",
  },
  mail: {
    margin: "14px 0px 0px 40px",
  },
  importContainer: {
    marginLeft: "30px",
  },
  newProspectContainer: {
    marginLeft: "10px",
  },
  prospectList: {
    width: "100%",
    height: "500px",
    marginTop: "50px",
  }
}));

const Prospects = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <NavBar />
      <div>
        <Grid className={classes.container} container spacing={1}>
          <Grid>
            <Typography variant="h5"> Prospects </Typography>
          </Grid>
          <Grid className={classes.bolt}>
            <i class="fas fa-bolt" style={{color: "grey"}}></i>
          </Grid>
          <Grid className={classes.mail}>
            <i class="fas fa-envelope" style={{color: "grey"}}></i>
          </Grid>
          <Grid className={classes.importContainer}>
            <OutlinedButton className={classes.importButton}> Imports </OutlinedButton>
          </Grid>
          <Grid className={classes.newProspectContainer}>
            <CustomizedButton 
              className={classes.newProspectButton}>
              Add New Prospect
              <div className={classes.seperationLine}></div>
              <div className={classes.arrow} >
                <i className="fas fa-sort-down fa-sm" style={{color: "white"}}></i>
              </div>
            </CustomizedButton>
          </Grid>
        </Grid>
      </div>
      <UserInputContainer className={classes.prospectList}>

      </UserInputContainer>
    </Fragment>
  )
}

export default Prospects;