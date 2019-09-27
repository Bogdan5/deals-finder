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
    };
    console.log('Props in Calendar ', props);
  }

  componentDidMount() {
    console.log('Calendar uploaded', this.props.formPosition);
  }

  componentDidUpdate(prevProps) {
    const { type, visibility } = this.props;
    const { button } = visibility;
    console.log('Updated', prevProps);
    console.log('Updated', this.props);
    if (type === this.props.visibility.button && prevProps.visibility.button === ''
      && prevProps.visibility.button !== this.props.visibility.button) {
      console.log('Update component ', this.props.isVisible);
      this.setState({ isVisible: '' });
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
    console.log('Position ', mousePositionX, mousePositionY);
    console.log('Calendar ', calendarWidth, calendarHeight, calendarLeft, calendarTop);
    if (mousePositionX > (calendarLeft + calendarWidth) || mousePositionX < calendarLeft
      || mousePositionY > (calendarTop + calendarHeight) || mousePositionY < calendarTop) {
      console.log('click on wrapper');
      this.setState({ isVisible: ' calendarInvisible' });
      this.props.typeButtonCalendar('');
    }
  }

  weapperKeyDown = (e) => {
    // if keyacode is tilde, then close
    console.log('key down');
  }

  render() {
    const {
      year, month, day, isVisible,
    } = this.state;
    const { formPosition } = this.props;
    return (
      <div
        className={`calendarWrapper${isVisible}`}
        onClick={this.wrapperClick}
        onKeyDown={this.wrapperKeyDown}
        role="presentation"
      >
        <p>{this.props.type}</p>
        <div className="calendarContainer" ref={this.calendarRef}>
          <Button variant="secondary" onClick={this.submit}>Next Monday</Button>
          <Button variant="secondary" onClick={this.submit}>Next Tuesday</Button>
          <Button variant="secondary" onClick={this.submit}>Next Thursday</Button>
          <Button variant="secondary" onClick={this.submit}>Next Friday</Button>
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
              <div className="calendarCell">
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
