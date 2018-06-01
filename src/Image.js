import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Image extends Component {

  static propTypes = {
    uri: PropTypes.string.isRequired,
  };

  state = {
    currentUri: null,
    nextUri: null
  };

  handleImageLoaded() {
    this.setState({
      currentUri: this.state.nextUri,
      nextUri: null
    });
  }

  componentDidMount() {
    this.setState({
      nextUri: this.props.uri,
    });
  }

  handleImageErrored() {
    console.error("Error loading image");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nextUri: nextProps.uri,
    });
  }

  render() {
    const { currentUri, nextUri } = this.state;
    return (
      <div className="container" >
        <img src={currentUri} alt="Current" />
        <img
          src={nextUri}
          onLoad={this.handleImageLoaded.bind(this)}
          style={{ display: "none" }}
          alt="Loading next"
        />
        <div className="background-image" src={currentUri} style={{ backgroundImage: `url('${currentUri}')` }} />
      </div>
    )
  }
};
