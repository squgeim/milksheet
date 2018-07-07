import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Logo from '../../components/logo';

import * as formUtil from '../../utils/form';

import * as loginThunks from '../../thunks/loginThunks';

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
    display: 'flex',
    padding: theme.spacing.unit,
    alignItems: 'center',
    flexDirection: 'column',
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
    const formFields = [
      {
        name: 'email',
        validator: value => {
          if (!value) {
            return 'Email is required';
          }

          if (!/\S+@\S+\.\S+/.test(value)) {
            return 'Invalid email address';
          }
        },
      },
      {
        name: 'password',
        validator: value => {
          if (!value) {
            return 'Password is required';
          }
        },
      },
    ];

    const loginForm = formUtil.createForm(this, formName, formFields);

    this.isFormValid = loginForm.isFormValid;
    this.handleChange = loginForm.handleChange;
    this.formUnfocused = loginForm.handleBlur;
    this.getFieldValue = loginForm.getFieldValue;
  }

  login = e => {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    const email = this.getFieldValue('email');
    const password = this.getFieldValue('password');

    this.props.login({ email, password });
  };

  render() {
    const { classes, isLoggingIn } = this.props;
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
                disabled={isLoggingIn}
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
                disabled={isLoggingIn}
                {...loginForm.password}
              />
            </div>
            {isLoggingIn || (
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
                <Button variant="outlined" fullWidth={true} tabIndex={4}>
                  Sign Up
                </Button>
              </div>
            )}
            {isLoggingIn && (
              <div className={classes.padding}>
                <CircularProgress />
              </div>
            )}
          </div>
        </form>
      </Paper>
    );
  }
}

export default compose(
  connect(
    state => ({
      isLoggingIn: state.login.isLoggingIn,
    }),
    dispatch => ({
      login({ email, password }) {
        dispatch(loginThunks.loginUser({ email, password }));
      },
    })
  ),
  withStyles(styles)
)(Login);
