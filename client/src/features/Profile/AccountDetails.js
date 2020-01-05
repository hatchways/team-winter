import React, { useState, useEffect } from 'react';
import { 
    makeStyles,
    Typography,
    Paper,
    Button,
    TextField,
    Grid,
  } from '@material-ui/core';
import { apiRequest } from '../../utils';

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      marginTop: 100,
      marginLeft: 30
    },
    detailRow: {
        marginTop: '2rem',
    },
    label:{
      marginLeft: '4rem'
    },
    textField:{
      marginRight: '3rem'
    },
    button: {
        float: 'right',
        marginRight: '3rem',
        marginTop: '2rem',
    },
    paper: {
        marginTop: '2rem',
        marginLeft: 25,
        width: '40%',
        height: '350px',
    },
    horizontalDivider: {
        borderColor: '#EDECF2',
        height: '2px',
        width: '55px',
      },
  }))

const DetailRow = (props) => {
    const classes = useStyles();

    return (
        <Grid container item
              direction="row"
              alignItems="center"
              justify="space-between"
              className={classes.detailRow}>
          <Grid item>
              <Typography className={classes.label} variant="h7">
                {props.header}
              </Typography>
          </Grid>
          <Grid item>
            <TextField
                required
                value={props.value}
                error={props.value.length > 0 ? false : true}
                helperText={props.value.length < 1 ? "Field is required" : null} 
                onChange={e => props.handleOnChange(e.target.value)}
                variant="outlined"
                className={classes.textField}/>
            </Grid>
        </Grid>
    )
}

const AccountDetails = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      setUser();
    }, [])
  
    const setUser = () => {
      apiRequest('GET', `/user`)
      .then( data => {
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
      })
      .catch( e => {
        console.log(e);
      })
    }

    const validate = () => {
      const firstNameError = firstName.length < 1,
            lastNameError = lastName.length < 1,
            emailError = email.length < 1;
      if(firstNameError || lastNameError || emailError) {
        return false;
      }
      return true;
    }

    const handleUpdate = () => {
      if(!validate()) return;
      
      const data = {
        first_name : firstName,
        last_name : lastName,
        email : email
      }

      apiRequest('PUT', `/user`, data)
      .then( data => {
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
      })
      .catch( e => {
        console.log(e);
      })
    }

    return (
      <Paper className={classes.paper}>
        <Grid container item
              direction="column">
          <DetailRow header="First name" value={firstName} 
                     handleOnChange={setFirstName}/>
          <DetailRow header="Last name" value={lastName} 
                     handleOnChange={setLastName}/>
          <DetailRow header="Email" value={email} 
                     handleOnChange={setEmail}/>
          <Grid item>
            <Button className={classes.button}
                    onClick={handleUpdate}
                    variant="outlined">
                        Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )

  }

  export default AccountDetails;