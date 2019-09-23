import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
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
import Dashboard from './components/Dashboard';

import { setMousePosition, typeButtonCalendar } from './actions/usageActions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      mouseX: 0,
      mouseY: 0,
    };
    library.add(fab, faChevronUp, faChevronDown);
  }

  appClick = (e) => {
    const { visibility } = this.props;
    console.log('Clicked ');
    // this.setState({ mouseX: e.screenX, mouseY: e.screenY });
    if (visibility.button.length > 0) {
      setMousePosition(e.screenX, e.screenY);
      typeButtonCalendar('');
    }
  }

  render() {
    const { registered } = this.state;
    return (
      <div className="App" onClick={this.appClick}>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={Link} eventKey="1" to="/" exact="true">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} eventKey="2" active={registered} to="/users/login">
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
        <Switch>
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  visibility: state.visibility,
});

const mapDispatchToProps = (dispatch) => ({
  setMousePosition: (mouseX, mouseY) => dispatch(setMousePosition(mouseX, mouseY)),
  typeButtonCalendar: (button) => dispatch(typeButtonCalendar(button)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
