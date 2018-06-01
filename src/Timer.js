import React from "react";
import PropTypes from "prop-types";

export default class Timer extends React.Component {
  static propTypes = {
    tick: PropTypes.func.isRequired,
    timeout: PropTypes.number.isRequired
  };

  componentDidMount() {
    const { tick, timeout } = this.props;
    const intervalId = setInterval(tick, timeout);
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
