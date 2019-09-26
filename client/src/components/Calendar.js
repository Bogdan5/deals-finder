import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      year: new Date().getFullYear(),
      month: this.monthName(new Date().getMonth()),
      day: new Date().getDay(),
      isVisibleState: ' calendarInvisible',
    };
    console.log('Props in Calendar ', props);
  }

  componentDidMount() {
    console.log('Calendar uploaded', this.props.formPosition);
  }

  componentDidUpdate(prevProps) {
    console.log('Updated', prevProps);
    console.log('Updated', this.props);
    if (prevProps.isVisible !== this.props.isVisible) {
      console.log('Update component ', this.props.isVisible);
      this.setState({ isVisibleState: this.props.isVisible});
    }
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

  wrapperClick = (e) => {
    const { formPosition } = this.props;
    const mousePositionX = e.clientX - formPosition.formLeft;
    const mousePositionY = e.clienty - formPosition.formTop;
    const calendarLeft = this.calendarRef.current.offsetLeft;
    const calendarTop = this.calendarRef.current.offsetTop;
    const calendarWidth = this.calendarRef.current.clientWidth;
    const calendarHeight = this.calendarRef.current.clientHeight;
    console.log('Position ', formPosition);
    console.log('Calendar ', calendarWidth, calendarHeight, calendarLeft, calendarTop);
    if (mousePositionX > (calendarLeft + calendarWidth) || mousePositionX < calendarLeft
      || mousePositionY > (calendarTop + calendarHeight) || mousePositionY < calendarTop) {
      console.log('click on wrapper');
      this.setState({ isVisibleState: ' calendarInvisible' });
      this.props.closeCalendar(this.props.type)
    }
  }

  weapperKeyDown = (e) => {
    // if keyacode is tilde, then close
    console.log('key down');
  }

  render() {
    const {
      year, month, day, isVisibleState
    } = this.state;
    const { formPosition } = this.props;
    return (
      <div
        className={`calendarWrapper${isVisibleState}`}
        onClick={this.wrapperClick}
        ref={this.calendarRef}
        onKeyDown={this.wrapperKeyDown}
        role="presentation"
        style={{ marginLeft: 0 - formPosition.formLeft, marginTop: 0 - formPosition.formTop }}
      >
        <p>{this.props.type}</p>
        <div className="calendarContainer">
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

const mapDisplayToProps = (dispatch) => ({
  
});

export default connect(null, mapDispatchToProps)(Calendar);
