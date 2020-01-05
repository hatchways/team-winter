import React, { Fragment, useState } from 'react';
import { 
    makeStyles,
    Grid,
    Typography,
    Paper,
    Divider
  } from '@material-ui/core';
import AccountDetails from '../features/Profile/AccountDetails';

import NavBar from '../features/NavBar/MainBody';

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      marginTop: 100,
      marginLeft: 30
    },
    tabItem: {
      padding: 25,
      width: '100%',
      '&:hover, &:focus': {
        backgroundColor: '#fcfcfc',
        cursor: 'pointer'
      }
    },
    paper: {
        marginTop: '2rem',
        marginLeft: 25,
        
    },
    horizontalDivider: {
        borderColor: '#EDECF2',
        height: '2px',
        width: '55px',
      },
  }))

const AccountTab = (props) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.tabItem}
          onClick={() => props.setTab(props.name)}>
      <Typography align="center">{props.name}</Typography>  
    </Grid>
  )
}

const AccountTabs = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
          <Grid container item
                direction="column"
                justify="space-evenly"
                alignItems="center">
            <AccountTab name="Account" setTab={props.handleClick}></AccountTab>
            <Grid item>
              <Divider className={classes.horizontalDivider}/>
            </Grid>
            <AccountTab name="Details" setTab={props.handleClick}></AccountTab>
            <Grid item>
              <Divider className={classes.horizontalDivider}/>
            </Grid>
            <AccountTab name="Security" setTab={props.handleClick}></AccountTab>
            <Grid item>
              <Divider className={classes.horizontalDivider}/>
            </Grid>
            <AccountTab name="Settings" setTab={props.handleClick}></AccountTab>
            <Grid item>
              <Divider className={classes.horizontalDivider}/>
            </Grid>
            <AccountTab name="Privacy" setTab={props.handleClick}></AccountTab>
          </Grid>
        </Paper>
    )
}

const Profile = () => {
    const classes = useStyles();
    const [tab, setTab] = useState("Account");

    let display = null;

    if(tab === "Account") {
      display = (<AccountDetails/>);
    } 

    return (
      <Fragment>
        <NavBar />
        <Grid container
              className={classes.container}>
          <Grid item>
            <Typography variant="h4">Profile</Typography>
          </Grid> 
        </Grid>
        <Grid container
              direction="row">
            <AccountTabs handleClick={setTab}/>
            {display}
        </Grid>
      </Fragment>
    )
  }
  
  export default Profile;