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
      <Container>
        <Row className="rowTitlesDashboard">
          <Col
            md={{ span: 5 }}
            lg={{ span: 5 }}
            className="titlesDashboard"
          >
            Add contribution
          </Col>
          <Col
            md={{ span: 5, offset: 2 }}
            lg={{ span: 5, offset: 2 }}
            className="titlesDashboard"
          >
            Previous contributions
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 5 }}
            md={{ span: 5 }}
            className="titlesDashboard"
          >
            <Link to="/addDeal">New offer</Link>
            <Link to="/addStore">New store</Link>
          </Col>
          <Col
            md={{ span: 5, offset: 2 }}
            lg={{ span: 5, offset: 2 }}
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
        <Forms />
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

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps)(Dashboard);
