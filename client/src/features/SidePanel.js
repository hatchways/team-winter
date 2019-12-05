import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandPanel from './ExpandPanel';

import { getAllImportedFrom } from '../utils';

const useStyles = makeStyles(() => ({
  root: {
  },
  test:{
    height: 400,
  }
}));

const SidePanel = ({ handleSearch }) => {
  const classes = useStyles();
  const [importedFromList, handleImportedFrom] = useState([{}]);
  const [placeholderValue, handlePlaceHolder] = useState('')

  
  const actionType1 = ['Imported from', 'imported_from'];
  
  const getData = (action) => {
    getAllImportedFrom(action).then((data) => handleImportedFrom(data));
  }

  const handleQueryTerm = (query) => {
    const queried = importedFromList.filter(each => (each.id === query))
    handleSearch(queried[0].name)
    handlePlaceHolder(queried[0].id)
  }

  return (
    <Paper className={classes.root}>
    <div className={classes.test}></div>
      <ExpandPanel
        actionType={actionType1}
        importedFromList={importedFromList}
        handleSearch={handleSearch}
        getData={getData}
        placeholderValue={placeholderValue}
        handleQueryTerm={handleQueryTerm}
        >
      </ExpandPanel>
      <div className={classes.test}></div>
    </Paper>
  );
}

export default SidePanel;