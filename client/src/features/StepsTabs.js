import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    height: 60,
    margin: "30px 0px",
  },
  tab: {
    height: 60,
    borderRight: "2px solid #EDECF2 "
  },
  selected: {
    background: "linear-gradient(45deg, #2AA897 20%, #4FBE75 80%)",
    height: 60,
  }
}))

const StepsTabs = (props) => {
  const { steps } = props;
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{ style: { background: 'none' } }}
      >
        {steps.map((tab, idx) => (
          <Tab
            className={(idx === selected) ? classes.selected : classes.tab}
            key={idx}
            label={`Step ${idx}`}
            onClick={() => setSelected(idx)}
            />
        ))}
      </Tabs>
    </Grid>
  )
}

export default StepsTabs;