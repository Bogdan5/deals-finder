import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { typeButtonCalendar } from '../actions/usageActions';

class Forms extends Component {
  constructor() {
    super();
    this.startCalendarRef = React.createRef();
    this.endCalendarRef = React.createRef();
    this.state = {
      autocompVisibility: ' invisible',
      brand: '',
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

  throttle = (fn, wait) => {
    var lastFunc;
    var lastRan;
    return function () {
      var context = this;
      var args = arguments;
      if (!lastRan) {
        fn.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= wait) {
            fn.apply(context, args);
            lastRan = Date.now();
          }
        }, wait - (Date.now() - lastRan));
      }
    };
  };
  
  debounce = (fn, wait) => {
    var timeout;
    return function () {
      var args = arguments;
      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  };

  inputHandler = (e) => {
    let currentSearch;
    let previousSearch;
    let cache = {};
    let request;
    const handleResponse = (searchTerm, searchResults) => {
      // ensure we're dealing with the latest search term so that
      // we don't mistakenly update our suggestions element in the wrong order
      if (currentSearch === searchTerm) {
        // do something with search results here for e.g.
        
      }
    };

    const handleSearch = (input) => {
      // store the current search term, trimmed
      currentSearch = input.trim();

      // ensure this is a new search
      if (currentSearch !== previousSearch) {
        // update previous search
        previousSearch = currentSearch;

        // check if there is a property in the cache for this search
        if (currentSearch in cache) {
          handleResponse(currentSearch, cache[currentSearch]);
        } else {
          // check if there is an in-flight request, if so, abort it
          if (request) {
            request.abort();
          }
          // start a new http request for auto suggest results
          request = new XMLHttpRequest();

          request.open('GET', 'https://api.host.com/v1/autosuggest?q=' + currentSearch, true);

          request.onreadystatechange = function () {
            if (request.readyState === 4) {
              if (request.status === 200) {
                // if we get a result back, set the cache
                cache[currentSearch] = request.responseText;
                handleResponse(currentSearch, request.responseText);
              }
              // clear the request variable
              request = null;
            }
          };

          // send the request
          request.send();
        }
      }
    };

    var throttledSearch = throttle(handleSearch, 500);
    var debouncedSearch = debounce(handleSearch, 500);

    return (event) => {
      const input = e.target.value;

      // if this is a valid input to trigger a search...
      // (at least 1 character or equal to 1 character which isn't whitespace)
      if (input.length > 1 || (input.length === 1 && /\S/.test(input))) {
        // if the input is short or ends with a space
        if (input.length < 5 || / $/.test(input)) {

          // throttle - display the results eagerly
          throttledSearch(input);
        } else {
          // debounce - display the resuts when user stops typing
          debouncedSearch(input);
        }
      }
    };
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
    const { autocompVisibility } = this.state;
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
            <Form.Control
              type="text"
              placeholder="Product brand"
              id="brand"
              onChange={this.inputHandler}
            />
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
        <div className={`formsAutocomplete${autocompVisibility}`}>

        </div>
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
