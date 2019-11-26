import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CustomizedButton from '../features/CustomizedButton';
import OutlinedButton from '../features/OutlinedButton';
import NavBar from '../features/NavBar/MainBody';
import UserInputContainer from '../features/UserInputContainer';

const useStyles = makeStyles((theme) => ({
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
  icon: {
    margin: "16px 17px 0px 14px",
  },
  featuresContainer:{
    padding: "40px 60px",
  },
  prospectList: {
    width: "100%",
    height: "500px",
    marginTop: "0px",
    [theme.breakpoints.up("xl")]: {
      backgroundColor: "green[500]",
    }
  }
}));

const Prospects = () => {
  const classes = useStyles();

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
      <UserInputContainer className={classes.prospectList}>

      </UserInputContainer>
    </Fragment>
  )
}

export default Prospects;