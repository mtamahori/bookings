import React, { Component } from 'react';
import { connect } from 'react-redux'
import dateFns from 'date-fns';
import './calendar.css';

class CalendarMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
    };
  }

  render() {
    return (
      <div className="calendar">
        <div>{this.renderHeader()}</div>
        <div>{this.renderDays()}</div>
        <div>{this.renderCells()}</div>
      </div>
    );
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon" onClick={this.nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 1; i < 8; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    //
    const { calendarGigs } = this.props;
    let calendarGigDates = calendarGigs.map(gig => {
      let gigDateArr = gig.date.split('/')
      let gigYear = gigDateArr[0]
      let gigMonth = gigDateArr[1]
      let gigDate = gigDateArr[2]
      let rawDate = new Date(gigYear, gigMonth, gigDate)
      let formattedDate = dateFns.format(new Date(gigYear, gigMonth, gigDate), 'D')
      return dateFns.isWithinRange(rawDate, monthStart, monthEnd) && formattedDate
    })

    // need to check this date array with the date of any given cell, render as needed

    // first version of this function will only render the cells for the current month. will need to re-click the "view X gigs" button upon changing months
    // console.log('calendarGigDates', calendarGigDates)

    //

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        // const cloneDay = day;

        // add 'marked' class to dates that match the calendarGigDates
        if (calendarGigDates.includes(formattedDate)) {
          days.push(
            <div
              className={`col cell marked`}
              key={day}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
        }
        //

        else {
          days.push(
            <div
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, selectedDate)
                    ? "selected"
                    : ""
              }`}
              key={day}
              // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
        }
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  // onDateClick = day => {
  //   this.setState({
  //     selectedDate: day
  //   });
  // };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
}

const mapState = ({ calendarGigs }) => ({ calendarGigs });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CalendarMain)
