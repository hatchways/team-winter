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
    minWidth: 300,
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

const SelectFromList = ({ props }) => {
  const classes = useStyles();
  const { listOfCampaigns, actionType, setCampaignId, campaignId } = props;

  return (
    <div>
      <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          displayEmpty
          value={campaignId}
          onChange={e => setCampaignId(e.target.value)}
          input={<Input />}
          MenuProps={MenuProps}
          >
          <MenuItem disabled value="">
            {actionType}
          </MenuItem>
            {listOfCampaigns.map(campaign => (
            <MenuItem
              key={campaign.name}
              value={campaign.id}
              >
              {campaign.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectFromList;