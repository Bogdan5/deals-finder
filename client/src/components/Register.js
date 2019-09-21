import React, { Component } from 'react';
import '../App.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  handler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  submit = (e) => {
    const {
      username, email, password, password2,
    } = this.state;
    e.preventDefault();
    const user = {
      username, email, password, password2,
    };
    this.props.registerUser(user, this.props.history);
  }

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.submit}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              placeholder="Username"
              onChange={this.handler}
              id="username"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              placeholder="Email"
              onChange={this.handler}
              id="email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="text"
              placeholder="Password"
              onChange={this.handler}
              id="password"
            />
          </label>
          <label htmlFor="password2">
            Confirm password
            <input
              type="text"
              placeholder="Confirm password"
              onChange={this.handler}
              id="password2"
            />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('Own props ', ownProps);
  // return bindActionCreators({registerUser}, dispatch);
  return ({
    registerUser: (user, history) => dispatch(registerUser(user, history)),
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
