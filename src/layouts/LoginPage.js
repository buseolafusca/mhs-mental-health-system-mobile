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


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      remember: false,
      error: {}

    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleLogin() {
    this.setState({
      error: {}
    });

    const { Username, Password, remember } = this.state;
    // console.log(Username);
    // console.log(Password);
    // console.log(remember);
    console.log({'email': Username, 'password': Password})
// {credentials: {email: "ss", password: "aaa"}}
    this.props.actions.logInUser({'email': Username, 'password': Password});

    

  }

  componentDidMount() {
    console.log("songchen345@gmail.com")
    // $('input').iCheck({
    //   checkboxClass: 'icheckbox_square-blue',
    //   radioClass: 'iradio_square-blue',
    //   increaseArea: '20%' // optional
    // });
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }

  handleCheck() {
    this.setState({
      remember: !this.state.remember
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
      rememberMe: 'Remember Me',
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

          <input
            maxLength={usernameOptions.maxLength}
            placeholder={usernameOptions.placeholder}
            autoComplete="off"
            className={usernameOptions.className}
            onChange={e => this.handleChange('Username', e)}
            type={usernameOptions.type}
          />
          <ErrorText errText={this.state.error.email} />
          <span className="glyphicon glyphicon-envelope " />
        </div>
        <div className={passwordOptions.containerClassName}>
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
          <span className="glyphicon glyphicon-lock" />
        </div>
        <div style={{
            content: ' ',
            marginRight: -15,
            marginLeft: -15
          }}
        >
          <div className="remember-container">
            <div>
              <label htmlFor="remember">
                <input
                  id="remember"
                  checked={this.state.remember}
                  onChange={this.handleCheck}
                  type="checkbox"
                /> {i18n.rememberMe}
              </label>
            </div>
          </div>
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

export default connect(null, mapDispatchToProps)(LoginForm);