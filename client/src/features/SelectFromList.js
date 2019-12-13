import React from 'react';

import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "0px 25px",
    minWidth: 80,
    maxWidth: 300,
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

const SelectFromList = (props) => {
  let { dataList, actionType, setValue, currentValue } = props;
  const classes = useStyles();

  if (!dataList) {
    dataList = [];
  }

  return (
    <div>
      <FormControl className={clsx(classes.formControl)}>
        <Select
          displayEmpty
          value={currentValue}
          onChange={e => setValue(e.target.value)}
          input={<Input />}
          MenuProps={{anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
          >
          <MenuItem disabled value="">
            {actionType[0]}
          </MenuItem>
            {dataList.map((item, idx) => (
            <MenuItem
              key={idx}
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