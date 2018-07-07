import React from 'react';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Logo from '../logo';

const styles = theme => ({
  logo: {
    margin: 0,
  },
  sidebarOpenMargin: {
    marginLeft: 250,
    right: 'auto',
  },
});

const Header = ({ classes, isSidebarOpen }) => (
  <AppBar
    className={classnames({ [classes.sidebarOpenMargin]: isSidebarOpen })}
  >
    <Toolbar>
      <Typography variant="title" color="inherit">
        Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
