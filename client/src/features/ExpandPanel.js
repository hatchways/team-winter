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
    padding: "20px 0px",
  },
  heading: {
    fontWeight: 500,
    padding: 5,
  },
  select: {
    width: 200,
  },
  checkbox: {
    padding: 5,
    color: "#4FBE75"
  }
}));

const ExpandPanel = ({ getData, list, actionType, handleSearchTerm, placeholderValue}) => {
  const classes = useStyles();
  const [checked, handleCheck] = useState(false);

  const handleExpand = () => {
    getData(actionType[1])
    handleCheck(!checked)
  }

  const handleQueryTerm = (query) => {
    const queried = list.filter(each => (each.id === query))

    handleSearchTerm({id: queried[0].id, name: queried[0].name})
  }

  let selectFromList = null;
  if (list.length > 0) {
    selectFromList = (
      <SelectFromList
        className={classes.select}
        dataList={list}
        actionType={actionType}
        setValue={handleQueryTerm}
        currentValue={placeholderValue}
        >
      </SelectFromList>
    )
  }
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          onClick={() => handleExpand()}
        >
        {checked ? <div><CheckBoxIcon className={classes.checkbox} /></div>  : <div><CheckBoxOutlineBlankIcon className={classes.checkbox} /></div>}
          <Typography className={classes.heading}>{actionType[0]}</Typography>
        </ExpansionPanelSummary>
       {selectFromList}
      </ExpansionPanel>
    </div>
  );
}

export default ExpandPanel;