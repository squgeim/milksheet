import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import Logo from '../logo';

const styles = theme => ({
  drawerPaper: {
    width: 250,
  },
  logo: {
    margin: 0,
  },
  toolbar: theme.mixins.toolbar,
});

const SidebarContent = ({ classes }) => (
  <React.Fragment>
    <Toolbar>
      <Logo className={classes.logo} />
    </Toolbar>
    <Divider />
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
