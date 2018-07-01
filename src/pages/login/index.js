import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Logo from '../../components/Logo';

const styles = theme => ({
  box: {
    width: 350,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    textAlign: 'center',
    paddingTop: 20,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: theme.spacing.unit,
  },
  loginOr: {
    color: theme.palette.grey[500],
    flex: 1,
    fontSize: theme.typography.fontSize - 1,
    textAlign: 'center',
    padding: theme.spacing.unit,
  },
});

class Login extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.box}>
        <div>
          <Logo className={classes.logo} />
        </div>
        <div className={classes.formContainer}>
          <div className={classes.padding}>
            <TextField
              autoFocus={true}
              id="email"
              label="Email"
              fullWidth={true}
            />
          </div>
          <div className={classes.padding}>
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth={true}
            />
          </div>
          <div className={classes.padding}>
            <Button variant="raised" color="primary" fullWidth={true}>
              Login
            </Button>
            <div className={classes.loginOr}>&mdash; or &mdash;</div>
            <Button variant="flat" fullWidth={true}>
              Sign Up
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);
