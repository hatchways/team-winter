import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandPanel from './ExpandPanel';


const useStyles = makeStyles(() => ({
  root: {
    width: "250px",
    height: "880px",
  },
  test:{
    height: 150,
  }
}));

const SidePanel = ({data, handleSearch, filterTerms}) => {
  const classes = useStyles();

  const actionType1 = 'Imported from : '

  return (
    <Paper className={classes.root}>
    <div className={classes.test}></div>
      <ExpandPanel actionType={actionType1} data={data} handleSearch={handleSearch} filterTerms={filterTerms}></ExpandPanel>
    </Paper>
  );
}

export default SidePanel;