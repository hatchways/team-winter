import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandPanel from './ExpandPanel';

import { getJWT } from '../utils';

const useStyles = makeStyles(() => ({
  root: {
    width: "250px",
    height: "880px",
  },
  test:{
    height: 150,
  }
}));

const SidePanel = ({ handleSearch }) => {
  const classes = useStyles();
  const [importedFromList, handleImportedFrom] = useState([{}]);
  const [placeholderValue, handlePlaceHolder] = useState('')

  console.log('sidepanel', importedFromList)
  const actionType1 = 'Imported from : ';

  const getAllImportedFrom = () => {
    fetch(`/prospects`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getJWT()}`
      }
    })
    .then(res => res.json())
      .then(result => {
        const importedFromObj = {};
        let idx = 0;

        result.Prospects.map((prospect) => {
          if (!importedFromObj[prospect.imported_from]) {
            importedFromObj[prospect.imported_from] = {'name': prospect.imported_from, 'id': idx};
            idx ++;
          } 
        })
        handleImportedFrom(Object.values(importedFromObj));
      })
    .catch(err => {
      console.log(err.message);
    });
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
        getAllImportedFrom={getAllImportedFrom}
        placeholderValue={placeholderValue}
        handleQueryTerm={handleQueryTerm}
        >
      </ExpandPanel>
    </Paper>
  );
}

export default SidePanel;