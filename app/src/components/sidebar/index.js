import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Logo from '../logo';

const styles = theme => ({
  drawerPaper: {
    width: 250,
  },
  logo: {
    margin: 0,
  },
  active: {
    background: theme.palette.grey[200],
  },
  toolbar: theme.mixins.toolbar,
});

const SidebarContent = ({ classes }) => (
  <React.Fragment>
    <Toolbar>
      <Logo className={classes.logo} />
    </Toolbar>
    <Divider />
    <List>
      <ListItem button className={classes.active}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </List>
  </React.Fragment>
);

const SideBar = ({ classes, isOpen = true, handleToggle, ...rest }) => (
  <Drawer
    variant="permanent"
    open={isOpen}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <SidebarContent classes={classes} {...rest} />
  </Drawer>
);

export default withStyles(styles)(SideBar);
