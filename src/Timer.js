import React from "react";
import PropTypes from "prop-types";

export default class Timer extends React.Component {
  static propTypes = {
    tick: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("timer")
    const { tick } = this.props;
    const intervalId = setInterval(tick, 5000);
    this.setState({ intervalId: intervalId });
    tick();
  }
  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    return null;
  }
}
