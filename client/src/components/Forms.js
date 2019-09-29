import React, { Component } from 'react';
import { Collapse, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { typeButtonCalendar } from '../actions/usageActions';

class Forms extends Component {
  constructor() {
    super();
    this.startCalendarRef = React.createRef();
    this.endCalendarRef = React.createRef();
    this.state = {

    };
  }

  visibilityHandler = (e) => {
    let _offsets;
    const heightButton = this.startCalendarRef.current.offsetHeight;
    if (e.target.id === 'start') {
      _offsets = this.getGlobalOffset(this.startCalendarRef.current);
    } else {
      _offsets = this.getGlobalOffset(this.endCalendarRef.current);
    }
    this.props.typeButtonCalendar(e.target.id, _offsets.left,
      _offsets.top + heightButton);
  }

  getGlobalOffset = (_el) => {
    const target = _el;
    const target_width = target.offsetWidth;
    const target_height = target.offsetHeight;
    const target_left = target.offsetLeft;
    const target_top = target.offsetTop;
    let gleft = 0;
    let gtop = 0;
    let rect = {};

    const moonwalk = (_parent) => {
      if (!!_parent) {
        gleft += _parent.offsetLeft;
        gtop += _parent.offsetTop;
        moonwalk(_parent.offsetParent);
      } else {
        rect = {
          top: target.offsetTop + gtop,
          left: target.offsetLeft + gleft,
          bottom: (target.offsetTop + gtop) + target_height,
          right: (target.offsetLeft + gleft) + target_width,
        };
      }
    };
    moonwalk(target.offsetParent);
    return rect;
  }

  render() {
    return (
      <div className="Forms">
        <Form>
          <Form.Group>
            <Button
              variant="light"
              id="start"
              onClick={this.visibilityHandler}
              ref={this.startCalendarRef}
              className="formCalendarButton"
            >
              Starting from
            </Button>
            <Button
              variant="light"
              id="end"
              onClick={this.visibilityHandler}
              ref={this.endCalendarRef}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  visibility: state.visibility,
});

const mapDispatchToProps = (dispatch) => ({
  typeButtonCalendar:
    (button, horizontal, vertical) => dispatch(typeButtonCalendar(button, horizontal, vertical)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
