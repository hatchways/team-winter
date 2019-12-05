import React from 'react';

import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectFromList = ({ dataList, actionType, setValue, currentValue }) => {
  const classes = useStyles();

  if (dataList === undefined) {
    dataList = [];
  }

  return (
    <div>
      <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          displayEmpty
          value={currentValue}
          onChange={e => setValue(e.target.value)}
          input={<Input />}
          MenuProps={MenuProps}
          >
          <MenuItem disabled value="">
            {actionType}
          </MenuItem>
            {dataList.map(item => (
            <MenuItem
              key={item.name}
              value={item.id}
              >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectFromList;
