import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpandPanel from './ExpandPanel';

import { getAllImportedFrom } from '../utils';

const useStyles = makeStyles(() => ({
  root: {
  },
  test:{
    height: 320,
  }
}));

const SidePanel = ({ importedFromTerm,  handleSearchImportedFrom, statusTerm, handleSearchStatus, emailTerm, handleSearchEmail, getAllProspects}) => {
  const classes = useStyles();
  const [importedFromList, handleImportedFromList] = useState([{}]);
  const [statusList, handleStatusList] = useState([{}]);

  const actionType = [['Imported from', 'imported_from'], ['Status', 'status'], ['Email', 'email']];

  const getImportedFromData = (action) => {
    getAllImportedFrom(action).then((data) => handleImportedFromList(data));
  }

  const getStatusData = (action) => {
    getAllImportedFrom(action).then((data) => handleStatusList(data));
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.test}></div>
        <ExpandPanel
          getAllProspects={getAllProspects}
          actionType={actionType[0]}
          list={importedFromList}
          handleSearchTerm={handleSearchImportedFrom}
          getData={getImportedFromData}
          placeholderValue={importedFromTerm.id}
          >
        </ExpandPanel>
        <ExpandPanel
          getAllProspects={getAllProspects}
          actionType={actionType[1]}
          list={statusList}
          handleSearchTerm={handleSearchStatus}
          getData={getStatusData}
          placeholderValue={statusTerm.id}
          >
        </ExpandPanel>
        <ExpandPanel
          actionType={actionType[2]}
          handleEmailTerm={handleSearchEmail}
          placeholderValue={statusTerm.id}
          emailTerm={emailTerm}
          handleSearchEmail={handleSearchEmail}
          >
        </ExpandPanel>
      <div className={classes.test}></div>
    </Paper>
  );
}

export default SidePanel;
