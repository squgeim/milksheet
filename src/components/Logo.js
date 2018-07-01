import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  text: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 100,
    color: 'darkblue',
    textShadow: 'skyblue 0px 2px',
  },
});

const Logo = ({ classes, className }) => (
  <h1 className={classNames(classes.text, className)}>MilkSheet</h1>
);

export default withStyles(styles)(Logo);
