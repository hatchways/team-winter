import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ItemTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#2AA897',
    marginBlockEnd: "46px",
    '& > div': {
      maxWidth: 60,
      width: '50%',
    },
  },
})(Tabs);

const ItemTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    marginRight: theme.spacing(4),
    color: "black",
    '&:hover': {
      color: '#2AA897',
      opacity: 1,
    },
    '&$selected': {
      color: '#2AA897',
    },
    '&:focus': {
      color: '#2AA897',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const CustomizedTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ItemTabs value={value} onChange={handleChange}>
        <ItemTab label="Campaigns" />
        <ItemTab label="Prospects" />
        <ItemTab label="Templates" />
        <ItemTab label="Reporting" />
      </ItemTabs>
    </div>
  );
}

export default CustomizedTabs;