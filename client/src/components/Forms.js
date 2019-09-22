import React, { Component } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { typeButtonCalendar } from '../actions/usageActions';


class Forms extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  visibilityHandler = (e) => {
    this.props.typeButtonCalendar(e.target.id);
  }

  render() {
    return (
      <div className="Forms">
        <Form>
          <Form.Group>
            <Button variant="light" id="Start" onClick={this.visibilityHandler}>Starting from</Button>
            <Button variant="light" id="End" onClick={this.visibilityHandler}>Ending on</Button>
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of product</Form.Label>
            <Form.Control as="select">
              <option>Fresh produce</option>
              <option>Canned goods</option>
              <option>Packaged food</option>
              <option>Frozen food</option>
              <option>Meat and meat products</option>
              <option>Sweets</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product brand</Form.Label>
            <Form.Control type="text" placeholder="Product brand" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Product name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="text" placeholder="Quantity" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of product</Form.Label>
            <Form.Control type="text" placeholder="Type of product" />
          </Form.Group>
        </Form>
        <Calendar type="start" isVisible={this.calendarVisibility} />
        <Calendar type="end" isVisible={this.calendarVisibility} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  typeButtonCalendar: (type) => dispatch(typeButtonCalendar(type)),
});

export default connect(null, mapDispatchToProps)(Forms);
