import React, { Component } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import Calendar from './Calendar';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isVisibleStart: false,
      isVisibleEnd: false,
    };
  }

  toggler = (e) => {

  }

  visibilityHandler = (e) => {
    this.setState({ [`isVisible${e.target.id}`]: true });
  }

  render() {
    const { isVisibleStart, isVisibleEnd } = this.state;
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
        <Calendar type="Start" isVisible={isVisibleStart} />
        <Calendar type="End" isVisible={isVisibleEnd} />
      </div>
    );
  }
}

export default Forms;
