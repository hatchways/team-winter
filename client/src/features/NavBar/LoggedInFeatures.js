import React, { Fragment, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  username: {
    color: "black",
    marginLeft: "5px",
    fontSize: "14px",
    fontWeight: 500,
  },
  toggleButton: {
    padding: "0",
    minWidth: "30px",
    fontSize: "0.5rem",
    marginRight: "30px",
  },
  toggleMenu: {
    margin: "30px 0px 0px 8px",
    overflow: 1,
  },
  LogOutText: {
    color: "black",
    textDecoration: "none",
    width: 90,
    padding: 15,
  }
}));

const ItemTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#2AA897',
    marginBlockEnd: "66px",
    '& > div': {
      maxWidth: 50,
      width: '30%',
    },
  },
})(Tabs);

const ItemTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontSize: "14px",
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
  const [value, setValue] = useState(0);
  const [toggle, handleToggle] = useState(null);

  const path = window.location.pathname.toLowerCase();

  useEffect(() => {
    if ( path === '/campaigns' ) {
      setValue(0);
    } else if ( path === '/prospects') {
      setValue(1);
    } else if ( path === '/templates') {
      setValue(2);
    } else if ( path === '/reporting') {
      setValue(3);
    }
  }, [path]);
  
  const handleClick = event => {
    handleToggle(event.currentTarget);
  };

  const handleClose = () => {
    handleToggle(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("mailsender_token")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
    <div>
      <ItemTabs value={value} onChange={handleChange}>
        <Link className={classes.LogOutText} to="/campaigns"> <ItemTab className={classes.littletabs} label="Campaigns" /> </Link>
        <Link className={classes.LogOutText} to="/prospects"> <ItemTab label="Prospects" /> </Link>
        <Link className={classes.LogOutText} to="/templates"> <ItemTab label="Templates" /> </Link>
        <Link className={classes.LogOutText} to="/reporting"> <ItemTab label="Reporting" /> </Link>
      </ItemTabs>
    </div>
    <Avatar src="https://ph-files.imgix.net/84451835-127d-469b-87f0-049c838b69a3?auto=format" />
    <Typography  className={classes.username} >
      Hatchways
    </Typography>
    <Button className={classes.toggleButton} onClick={handleClick}>
    <ArrowDropDownIcon fontSize="smaller" style={{color: "grey"}} pt={3} />
    </Button>
    <Menu
      className={classes.toggleMenu}
      anchorEl={toggle}
      keepMounted
      open={Boolean(toggle)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}><Link className={classes.LogOutText} to="/login">Logout</Link></MenuItem>
    </Menu>
    </Fragment>
  );
}

export default CustomizedTabs;