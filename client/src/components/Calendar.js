import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { typeButtonCalendar } from '../actions/usageActions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      isVisible: ' invisible',
      positionCalendarX: 0,
      positionCalendarY: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { type, visibility } = this.props;
    const { button, vertical, horizontal } = visibility;
    if (type === this.props.visibility.button && prevProps.visibility.button === ''
      && prevProps.visibility.button !== button) {
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

  handlerMonth = (e) => {
    const _month = e.target.value.toLowerCase();
    const _names = ['january', 'february', 'march', 'april', 'may',
      'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const _arrayFits = _names.filter((el) => el.match(_month));
    switch (_arrayFits.length) {
      case 1:
        this.setState({ month: _names.indexOf(_arrayFits) });
        break;
      case 0:
        this.setState({ month: new Date().getMonth() });
        break;
      default:
    }
  }

  // clickMonth = () => {
  //   this.setState({ month: 12 });
  // }

  wrapperClick = (e) => {
    const { year, month, day } = this.state;
    const data = { year, month, day };
    const mousePositionX = e.clientX;
    const mousePositionY = e.clientY;
    const calendarLeft = this.calendarRef.current.offsetLeft;
    const calendarTop = this.calendarRef.current.offsetTop;
    const calendarWidth = this.calendarRef.current.clientWidth;
    const calendarHeight = this.calendarRef.current.clientHeight;
    if (mousePositionX > (calendarLeft + calendarWidth) || mousePositionX < calendarLeft
      || mousePositionY > (calendarTop + calendarHeight) || mousePositionY < calendarTop) {
      console.log('click on wrapper');
      this.setState({ isVisible: ' invisible' });
      this.props.typeButtonCalendar('');
      // this.props.transmitCalendarData(data);
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

  increaseYear = () => {
    const { year } = this.state;
    console.log('IncreaseYear');
    this.setState({ year: year + 1 });
  }

  decreaseYear = () => {
    console.log('DecreaseYear');
    const { year } = this.state;
    this.setState({ year: year - 1 });
  }

  increaseMonth = () => {
    const { month } = this.state;
    if (month === 11) {
      this.setState({ month: 0 });
    } else {
      this.setState({ month: month + 1 });
    }
  }

  decreaseMonth = () => {
    const { month } = this.state;
    if (month === 0) {
      this.setState({ month: 11 });
    } else {
      this.setState({ month: month - 1 });
    }
  }

  increaseDay = () => {
    const { day, month, year } = this.state;
    if ((day === 30 && [3, 5, 8, 10].includes(month))
      || (day === 31 && [0, 2, 4, 6, 7, 9, 11].includes(month))
      || (day === 29 && month === 2 && year % 4 === 0)
      || (day === 28 && month === 2 && year % 4 > 0)) {
        console.log('Increase day ', day, month);
      this.setState({ day: 1 });
    } else {
        console.log('Increase day ', day, month);
        this.setState({ day: day + 1 });
    }
  }

  decreaseDay = () => {
    const { day, month, year } = this.state;
    if (day === 1) {
      if ([4, 6, 9, 11].includes(month)) {
        this.setState({ day: 30 });
      } else if (month === 1) {
        if (year % 4 === 0) {
          this.setState({ day: 29 });
        } else {
          this.setState({ day: 28 });
        }
      } else {
        this.setState({ day: 31 });
      }
    } else {
      this.setState({ day: day - 1 });
    }
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
              <div className="calendarCell" onClick={this.increaseYear}>
                <FontAwesomeIcon icon="chevron-up" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell" onClick={this.increaseMonth}>
                <FontAwesomeIcon icon="chevron-up" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell" onClick={this.increaseDay}>
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
                  onChange={this.handlerMonth}
                  onClick={this.clickMonth}
                  value={this.monthName(month)}
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
              <div className="calendarCell" onClick={this.decreaseYear}>
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell" onClick={this.decreaseMonth}>
                <FontAwesomeIcon icon="chevron-down" />
              </div>
              <div className="calendarCell" />
              <div className="calendarCell" onClick={this.decreaseDay}>
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
