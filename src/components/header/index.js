import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';

import Logo from '../logo';

const styles = theme => ({
  logo: {
    margin: 10,
  },
});

const Header = ({ classes }) => (
  <AppBar>
    <Logo className={classes.logo} light={true} />
  </AppBar>
);

export default withStyles(styles)(Header);
