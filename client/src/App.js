import React, { Component } from 'react';
// import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import { Nav } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: null,
      userID: null,
    };
    library.add(fab, faChevronUp, faChevronDown);
  }

  componentDidMount = () => {
    // const token = localStorage.getItem('jwtToken');
    // if (!token) {

    // }
    // const bearer = `Bearer ${localStorage.getItem('jwtToken')}`;
    // console.log('Bearer in App ', bearer);
    // const conf = {
    //   headers: { 'Authorization': bearer },
    // };
    // tests if the user is signed in - if not, redirects to sign in
    axios.get('/test')
      .then((res) => {
        console.log('Get test called');
        this.setState({
          authenticated: true,
          username: res.data.username,
          userID: res.data._id,
        });
      })
      .catch((err) => {
        console.log('Error:', err.response.status);
        this.setState({ authenticated: false });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={Link} eventKey="1" to="/" exact="true">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} eventKey="2" active={authenticated} to="/users/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} eventKey="3" to="/users/register">
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} eventKey="3" to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Calendar type="start" />
        <Calendar type="end" />

        <Switch>
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
