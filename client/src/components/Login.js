import React, { Component } from 'react';
import '../App.scss';
// import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    console.log('Props ', props);

    if (props.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }
  }

  handler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  submit = (e) => {
    const { username, password } = this.state;
    const { history } = this.props;
    console.log('History ', history);
    e.preventDefault();
    const userData = { username, password };
    this.props.loginUser(userData, history);
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.submit}>
          <label htmlFor="username">
            Username
            <input type="text" id="username" placeholder="Username" onChange={this.handler} />
          </label>
          <label htmlFor="password">
            Password
            <input type="text" id="password" placeholder="Password" onChange={this.handler} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
