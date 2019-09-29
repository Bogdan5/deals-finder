import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { logoutUser } from '../actions/authActions';
import Forms from './Forms';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      deals: [],
    };

    // axios call for recent contributions
    // axios.get('/dashboard')
    //   .then((res) => this.setState({ deals: res }))
    //   .catch((err) => console.log('Err ', err));
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { deals } = this.state;
    return (
      <Container className="dashboardContainer">
        <Row className="rowTitlesDashboard">
          <Col
            md={{ span: 6 }}
            lg={{ span: 6 }}
            className="titlesDashboard"
          >
            <h3>Add contribution</h3>
          </Col>
          <Col
            md={{ span: 5, offset: 1 }}
            lg={{ span: 5, offset: 1 }}
            className="titlesDashboard"
          >
            <h3>Previous contributions</h3>
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 6 }}
            md={{ span: 6 }}
            className="titlesDashboard"
          >
            <Forms />
          </Col>
          <Col
            md={{ span: 5, offset: 1 }}
            lg={{ span: 5, offset: 1 }}
            className="titlesDashboard"
          >
            <div>
              {deals.map((el) => (
                <p>
                  <span>{el.name}</span>
                  <span>{el.store}</span>
                </p>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

// Dashboard.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// const mapDispatchToProps = (dispatch) => {

// };

export default connect(mapStateToProps)(Dashboard);
