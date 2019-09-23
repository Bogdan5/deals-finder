import React, { Component } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import { typeButtonCalendar } from '../actions/usageActions';


class Forms extends Component {
  constructor() {
    super();
    this.state = {
      calendarVisible: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility.button !== this.props.visibility.button) {
      if (prevProps.visibility.button !== '') {
        this.setState({ calendarVisible: '' });
      } else {
        this.setState({ calendarVisible: this.props.visibility.button});
      }
    }
  }

  visibilityHandler = (e) => {
    this.props.typeButtonCalendar(e.target.id);
  }

  render() {
    const { calendarVisible } = this.state;
    return (
      <div className="Forms">
        <Form>
          <Form.Group>
            <Button variant="light" id="start" onClick={this.visibilityHandler}>Starting from</Button>
            <Button variant="light" id="end" onClick={this.visibilityHandler}>Ending on</Button>
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
        <Calendar type="start" isVisible={calendarVisible === 'start'} />
        <Calendar type="end" isVisible={calendarVisible === 'end'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  visibility: state.visibility,
});

const mapDispatchToProps = (dispatch) => ({
  typeButtonCalendar: (button) => dispatch(typeButtonCalendar(button)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
