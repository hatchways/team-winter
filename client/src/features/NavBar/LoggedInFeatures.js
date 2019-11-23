import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  username: {
    color: "black",
    marginLeft: "5px",
    fontSize: "smaller",
  },
  toggleMenu: {
    padding: "0",
    minWidth: "30px",
    fontSize: "0.5rem",
  },
}));


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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [toggle, handleToggle] = React.useState(null);

  const handleClick = event => {
    handleToggle(event.currentTarget);
  };

  const handleClose = () => {
    handleToggle(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
    <div>
      <ItemTabs value={value} onChange={handleChange}>
        <ItemTab label="Campaigns" />
        <ItemTab label="Prospects" />
        <ItemTab label="Templates" />
        <ItemTab label="Reporting" />
      </ItemTabs>
    </div>
    <Avatar src="https://ph-files.imgix.net/84451835-127d-469b-87f0-049c838b69a3?auto=format" />
    <Typography  className={classes.username} >
      Hatchways
    </Typography>
    <Button className={classes.toggleMenu} onClick={handleClick}>
      <i class="fas fa-sort-down fa-lg" style={{color: "grey"}}></i>
    </Button>
    <Menu
      id="simple-menu"
      anchorEl={toggle}
      keepMounted
      open={Boolean(toggle)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
    </Fragment>
  );
}

export default CustomizedTabs;