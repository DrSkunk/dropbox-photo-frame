import React, { Component } from 'react';
import ClockDisplay from 'react-clock';
import moment from 'moment-timezone';

export default class Clock extends Component {
  state = {
    date: moment().tz('Europe/Brussels')
  };

  componentDidMount() {
    setInterval(
      () => this.setState({ date: moment().tz('Europe/Brussels') }),
      1000
    );
  }
  render() {
    const { date } = this.state;

    return (
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 40,
          padding: 10,
          textAlign: 'center',
          borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.5)'
        }}
      >
        <ClockDisplay size={100} value={date.toDate()} />
        <span style={{ fontSize: '2em' }}>{date.format('HH:mm')}</span>
      </div>
    );
  }
}
