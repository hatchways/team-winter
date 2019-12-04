import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import SelectFromList from './SelectFromList';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  select: {
    width: 200,
  }
}));

const ExpandPanel = ({data, handleSearch, filterTerms, actionType}) => {
  const classes = useStyles();
  const [checked, handleCheck] = useState(false);
  let list = [];

  if (actionType === 'Imported from : ') {

    let importedFrom = {};
    data.map(prospect => {
      if (!importedFrom[prospect.imported_from]) return importedFrom[prospect.imported_from] = true;
    });

    (Object.keys(importedFrom)).map((each, idx) => {
      return list.push({id: idx, name: each});
    })
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        
        <ExpansionPanelSummary
          onClick={() => handleCheck(!checked)}
        >
        {checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          <Typography className={classes.heading}>{actionType}</Typography>
        </ExpansionPanelSummary>
        <SelectFromList
          className={classes.select}
          dataList={list}
          actionType={actionType}
          setValue={handleSearch}
          currentValue={filterTerms}
          >
        </SelectFromList>
      </ExpansionPanel>
    </div>
  );
}

export default ExpandPanel;