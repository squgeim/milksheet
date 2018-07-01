import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Logo from '../../components/Logo';

import * as formUtil from '../../utils/form';

const styles = theme => ({
  box: {
    width: 350,
    marginTop: '5%',
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
  constructor() {
    super();

    const formName = 'loginForm';
    const validator = {
      email: value => {
        if (!value) {
          return 'Email is required';
        }

        if (!/\w+@\w+\.\w+/.test(value)) {
          return 'Invalid email address';
        }
      },
      password: value => {
        if (!value) {
          return 'Password is required';
        }
      },
    };

    const loginForm = formUtil.createForm(
      this,
      formName,
      ['email', 'password'],
      validator
    );

    this.isFormValid = loginForm.isFormValid;
    this.handleChange = loginForm.handleChange;
    this.formUnfocused = loginForm.handleBlur;
  }

  login = e => {
    e.preventDefault();

    if (!this.isFormValid()) {
      alert('invalid form!');
    }

    console.log(this.state.loginForm);
  };

  render() {
    const { classes } = this.props;
    const { loginForm } = this.state;

    return (
      <Paper className={classes.box}>
        <div>
          <Logo className={classes.logo} />
        </div>
        <form onSubmit={this.login}>
          <div className={classes.formContainer}>
            <div className={classes.padding}>
              <TextField
                autoFocus={true}
                id="email"
                label="Email"
                fullWidth={true}
                onChange={this.handleChange}
                onBlur={this.formUnfocused}
                tabIndex={1}
                {...loginForm.email}
              />
            </div>
            <div className={classes.padding}>
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth={true}
                onChange={this.handleChange}
                onBlur={this.formUnfocused}
                tabIndex={2}
                {...loginForm.password}
              />
            </div>
            <div className={classes.padding}>
              <Button
                type="submit"
                variant="raised"
                color="primary"
                fullWidth={true}
                onClick={this.login}
                tabIndex={3}
              >
                Login
              </Button>
              <div className={classes.loginOr}>&mdash; or &mdash;</div>
              <Button variant="flat" fullWidth={true} tabIndex={4}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);
