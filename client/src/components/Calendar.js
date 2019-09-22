import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: this.monthName(new Date().getMonth()),
      day: new Date().getDay(),
    };
    console.log('Props in Calendar ', props);
  }

  componentDidMount() {
    console.log('Calendar uploaded');
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
      year, month, day,
    } = this.state;
    const { isVisible } = this.props;
    return (
      <div className={`calendarContainer ${isVisible}`}>
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
    );
  }
}

const mapStateToProps = (state) => {
  console.log('State in Calendar ', state);
  return {
    usage: state.usage,
  };
};

export default connect(mapStateToProps)(Calendar);
