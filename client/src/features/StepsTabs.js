import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '15px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    height: 64,
    margin: "30px 0px",

  },
  tab: {
    height: 60,
    borderRight: "2px solid #EDECF2 ",

  },
  selected: {
    background: "linear-gradient(45deg, #2AA897 20%, #4FBE75 80%)",
    height: 60,
  },
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
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { background: 'none' } }}
      >
        <Tab
          className={(0 === selected) ? classes.selected : classes.tab}
          key={0}
          label={"All"}
          onClick={() => setSelected(0)}
        />
        {steps.map((tab, idx) => (
          <Tab
            className={(idx + 1 === selected) ? classes.selected : classes.tab}
            key={idx + 1}
            label={`Step ${ idx + 1 }`}
            onClick={() => setSelected(idx + 1)}
            />
        ))}
      </Tabs>
    </Grid>
  )
}

export default StepsTabs;