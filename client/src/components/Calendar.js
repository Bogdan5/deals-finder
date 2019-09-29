import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { typeButtonCalendar } from '../actions/usageActions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      year: new Date().getFullYear(),
      month: this.monthName(new Date().getMonth()),
      day: new Date().getDay(),
      isVisible: ' calendarInvisible',
      positionCalendarX: 0,
      positionCalendarY: 0,
    };
  }

  componentDidUpdate(prevProps) {
    console.log('Visibility ', this.props.visibility);
    const { type, visibility } = this.props;
    const { button, vertical, horizontal } = visibility;
    if (type === this.props.visibility.button && prevProps.visibility.button === ''
      && prevProps.visibility.button !== this.props.visibility.button) {
      // const _offsets = this.getGlobalOffset(this.calendarRef);
      // console.log('Offsets ', _offsets);
      this.setState({
        isVisible: '',
        positionCalendarX: horizontal,
        positionCalendarY: vertical,
      });
    }
  }

  monthName = (number) => {
    const names = ['January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[number];
  }

  handler = (e) => {
    const { type } = this.props;
    const typeId = `${e.target.id}${type}`;
    this.setState({ [typeId]: e.target.value });
  }

  wrapperClick = (e) => {
    const mousePositionX = e.clientX;
    const mousePositionY = e.clientY;
    const calendarLeft = this.calendarRef.current.offsetLeft;
    const calendarTop = this.calendarRef.current.offsetTop;
    const calendarWidth = this.calendarRef.current.clientWidth;
    const calendarHeight = this.calendarRef.current.clientHeight;
    if (mousePositionX > (calendarLeft + calendarWidth) || mousePositionX < calendarLeft
      || mousePositionY > (calendarTop + calendarHeight) || mousePositionY < calendarTop) {
      console.log('click on wrapper');
      this.setState({ isVisible: ' calendarInvisible' });
      this.props.typeButtonCalendar('');
    }
  }

  wrapperKeyDown = (e) => {
    // if keyacode is tilde, then close
    console.log('key down');
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
    moonwalk( target.offsetParent );
    return rect;
  }

  render() {
    const {
      year, month, day, isVisible, positionCalendarX, positionCalendarY,
    } = this.state;
    return (
      <div
        className={`calendarWrapper${isVisible}`}
        onClick={this.wrapperClick}
        onKeyDown={this.wrapperKeyDown}
        role="presentation"
      >
        <div
          className="calendarContainer"
          ref={this.calendarRef}
          style={{ marginLeft: positionCalendarX, marginTop: positionCalendarY }}
        >
          <div className="calendarNextButtonsRow">
            <div className="calendarNextButton">Next Monday</div>
            <div className="calendarNextButton">Next Tuesday</div>
            <div className="calendarNextButton">Next Thursday</div>
            <div className="calendarNextButton">Next Friday</div>
          </div>
          <div className="Calendar">
            <div className="calendarRow">
              <div className="calendarCell" />
              <div className="calendarCell">
                <FontAwesomeIcon icon="chevron-up" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell">
                <FontAwesomeIcon icon="chevron-up" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell">
                <FontAwesomeIcon icon="chevron-up" />
              </div>
              <div className="calendarCell" />
            </div>
            <div className="calendarRow">
              <div className="calendarCell">
                Year
              </div>
              <div className="calendarCell">
                <input
                  className="calendarYearInput"
                  id="year"
                  onChange={this.handler}
                  value={year}
                />
              </div>
              <div className="calendarCell">
                Month
              </div>
              <div className="calendarCell">
                <input
                  className="calendarMonthInput"
                  id="month"
                  onChange={this.handler}
                  value={month}
                />
              </div>
              <div className="calendarCell">
                Day
              </div>
              <div className="calendarCell">
                <input
                  className="calendarDayInput"
                  id="day"
                  onChange={this.handler}
                  value={day}
                />
              </div>
            </div>
            <div className="calendarRow">
              <div className="calendarCell" />
              <div className="calendarCell" onClick={this.increase}>
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell">
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell">
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="calendarCell" />
            </div>
          </div>
        </div>
        <p>{this.props.type}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
