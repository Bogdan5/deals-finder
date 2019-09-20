import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      yearStart: new Date().getFullYear(),
      yearEnd: new Date().getFullYear(),
      monthStart: this.monthName(new Date().getMonth()),
      monthEnd: this.monthName(new Date().getMonth()),
      dayStart: new Date().getDay(),
      dayEnd: new Date().getDay(),
    };
  }

  monthName = (number) => {
    const names = ['January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[number];
  }

  handler = (e) => {
    const { type } = this.props;
    this.setState({ [`${e.target.id}${type}`]: e.target.value });
  }

  render() {
    const {
      yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd,
    } = this.state;
    const { isVisible } = this.props;
    return (
      <div className={`Calendar ${isVisible}`}>
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
              value={yearStart}
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
              value={monthStart}
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
              value={dayStart}
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
    );
  }
}

export default Calendar;
