import React from "react";
import PropTypes from "prop-types";
import config from "./config";

export default class Timer extends React.Component {
  static propTypes = {
    tick: PropTypes.func.isRequired
  };

  componentWillMount() {

    this.timeout =  new URL(window.location).searchParams.get("timeout") || config.timeout;
    console.log("timeout",this.timeout)
  }

  componentDidMount() {
    const { tick } = this.props;
    const intervalId = setInterval(tick, this.timeout);
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
