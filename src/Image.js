import React, { Component } from "react";
import PropTypes from "prop-types";
import ExifOrientationImg from "react-exif-orientation-img";

export default class Image extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired
  };

  state = {
    uris: []
  };

  componentDidMount = () => {
    this.setState({});
  };

  static getDerivedStateFromProps(props, state) {
    const { uri } = props;
    if (state.uris[0] === uri) {
      return null;
    }
    let uris = state.uris;
    uris.push(uri);
    if (uris.length === 3) {
      uris.shift();
    } else if (uris.length === 1) {
      uris.push(uri);
    }
    return { uris };
  }

  render() {
    const { uris } = this.state;
    const currentUri = uris[0];
    const nextUri = uris[1];
    return (
      <div className="container">
        <ExifOrientationImg src={currentUri} alt="Current" />
        <ExifOrientationImg
          src={nextUri}
          style={{ display: "none" }}
          alt="Loading next"
        />
        <div
          className="background-image"
          src={currentUri}
          style={{ backgroundImage: `url('${currentUri}')` }}
        />
      </div>
    );
  }
}
