import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 90
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 91
  },
  spacer: {
    height: "65px"
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.spacer} />
      <List>
        {props.children}
      </List>
    </Drawer>
  );
}

export default Sidebar;