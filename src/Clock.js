import React, { Component } from 'react';
import ClockDisplay from 'react-clock';

function addLeadingZero(time) {
  if (time < 9) {
    return 0 + '' + time;
  }
  return time;
}

export default class Clock extends Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    setInterval(() => this.setState({ date: new Date() }), 1000);
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
        <ClockDisplay size={100} value={date} />
        <span style={{ fontSize: '2em' }}>
          {addLeadingZero(date.getHours())}:{addLeadingZero(date.getMinutes())}
        </span>
      </div>
    );
  }
}
