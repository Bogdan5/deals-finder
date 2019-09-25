import React, { Component } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { typeButtonCalendar } from '../actions/usageActions';

import Calendar from './Calendar';


class Forms extends Component {
  constructor() {
    super();
    this.calendarStartRef = React.createRef();
    this.calendarEndRef = React.createRef();
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
    console.log('Visibility handler ', e.target.id);
    this.setState({ calendarVisible: e.target.type });
  }

  closer = (type) => {
    this.setState({ calendarVisible: '' });
  }

  render() {
    const { calendarVisible } = this.state;
    return (
      <div className="Forms">
        <Form>
          <Form.Group>
            <Button
              variant="light"
              id="start"
              onClick={this.visibilityHandler}
              ref={this.calendarStartRef}
            >
              Starting from
            </Button>
            <Button
              variant="light"
              id="end"
              onClick={this.visibilityHandler}
              ref={this.calendarEndRef}
            >
              Ending on
            </Button>
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
        <Calendar
          type="start"
          isVisible={(calendarVisible === 'start') ? '' : ' calendarInvisible'}
          closeCalendar={this.closer}
        />
        <Calendar
          type="end"
          isVisible={(calendarVisible === 'end') ? '' : ' calendarInvisible'}
          closeCalendar={this.closer}
        />
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
