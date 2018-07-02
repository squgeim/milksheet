import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  text: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 100,
    cursor: 'default',
  },
  textShadowDark: {
    textShadow: 'skyblue 0px 2px',
  },
  textShadowLight: {
    textShadow: 'darkblue 0px 2px',
  },
  colorLight: {
    color: theme.palette.primary.contrastText,
  },
  colorDark: {
    color: theme.palette.primary.dark,
  },
});

const Logo = ({ classes, className, shadow = true, light = false }) => (
  <h1
    className={classNames(
      classes.text,
      {
        [classes.textShadowDark]: shadow && !light,
        [classes.textShadowLight]: shadow && light,
        [classes.colorLight]: light,
        [classes.colorDark]: !light,
      },
      className
    )}
  >
    MilkSheet
  </h1>
);

export default withStyles(styles)(Logo);
