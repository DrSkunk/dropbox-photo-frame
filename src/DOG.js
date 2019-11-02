import React, { Component } from 'react';
import logo from './logo.png';

export default class DOG extends Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 30,
          height: 70,
          width: 70
        }}
      >
        <img className="DOG" src={logo} alt="DOG" />
      </div>
    );
  }
}
