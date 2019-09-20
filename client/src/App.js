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

import store from './store';
import { setMousePosition } from './actions/usageActions';


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
    this.setState({ mouseX: e.screenX, mouseY: e.screenY });
    this.props.SetMousePosition(e.screenX, e.screenY);
  }

  render() {
    const { registered } = this.state;
    return (
      <Provider store={store}>
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
          </Nav>
          <Switch>
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMousePosition: (mouseX, mouseY) => dispatch(setMousePosition(mouseX, mouseY))
});

export default connect(mapDispatchToProps)(App);
