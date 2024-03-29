import React from 'react';
import { PropTypes } from 'prop-types';
import ErrorText from '../components/ErrorText';
import styles from '../sass/style.scss';
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import LandingPage from './LandingPage'
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getAuthenticationToken } from '../services/BackendService.js'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../actions/SessionActions';
import { Link } from 'react-router-dom';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      error: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleLogin() {
    this.setState({
      error: {}
    });

    this.props.actions.logInUser({'email': this.state.Username, 'password': this.state.Password});

  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }

  render() {
    let usernameOptions = {
      maxLength: 40,
      placeholder: 'Email',
      type: 'email',
      containerClassName: 'input-container'
    };

    let passwordOptions = {
      maxLength: 40,
      placeholder: 'Password',
      type: 'password',
      containerClassName: 'input-container'
    };

    let formOptions = {
      className: 'login-form'
    };

    let i18n = {
      submitLabel: 'Sign In'
    };

    if (this.props.username) {
      usernameOptions = Object.assign(usernameOptions, this.props.username);
    }

    if (this.props.password) {
      passwordOptions = Object.assign(passwordOptions, this.props.password);
    }

    if (this.props.form) {
      formOptions = Object.assign(formOptions, this.props.form);
    }

    if (this.props.text) {
      i18n = Object.assign(i18n, this.props.text);
    }

    return (

      <div className='landing-page-container'>
              <NHSHeader />

      <form action="javascript:void(0)" noValidate onSubmit={this.handleLogin} className={formOptions.className}>

        <div className={usernameOptions.containerClassName}>
          <div class="row">
            <div class="block">
              <input
                maxLength={usernameOptions.maxLength}
                placeholder={usernameOptions.placeholder}
                autoComplete="off"
                className={usernameOptions.className}
                onChange={e => this.handleChange('Username', e)}
                type={usernameOptions.type}
              />
              <ErrorText errText={this.state.error.email} />
            </div>
            <div class="block2">
              <span className="glyphicon glyphicon-envelope " />
            </div>
          </div>
        </div>
        <div className={passwordOptions.containerClassName}>
          <div class="row">
            <div class="block">
              <input
                autoComplete="off"
                className={passwordOptions.className}
                maxLength={40}
                name="Password"
                onChange={e => this.handleChange('Password', e)}
                placeholder={passwordOptions.placeholder}
                type="password"
              />
              <ErrorText errText={this.state.error.password} />
            </div>
            <div class="block2">
              <span className="glyphicon glyphicon-lock" />
            </div>

          </div>
        </div>
        <div style={{
            content: ' ',
            marginRight: -15,
            marginLeft: -15
          }}
        >
          
          <Link to="/register" className="btn btn-link">Register</Link>
          <div className="button-container">
            <button type="submit" className="btnSubmit">{i18n.submitLabel}</button>
          </div>

        </div>
      </form>
        <NHSFooter />

      </div>
    );
  }
}
LoginForm.propTypes = {
  username: PropTypes.object,
  password: PropTypes.object,
  form: PropTypes.object,
  text: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};


LoginForm.defaultProps = {
  username: {},
  password: {}
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm);

export { ConnectedLoginForm, LoginForm };

