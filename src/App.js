import React, { Component } from "react";
import { Dropbox } from "dropbox";
import Image from "./Image";
import Timer from "./Timer";
import "./App.css";
import config from "./config";

class App extends Component {
  state = {
    imageUrl: null
  };

  accessToken = null;
  error = null;

  componentWillMount = () => {
    this.accessToken = {
      accessToken: new URL(window.location).searchParams.get("accessToken")
    };

    if (this.accessToken.accessToken === null) {
      this.accessToken = config.accessToken;
    }

    if (this.accessToken.accessToken === null) {
      this.error = true;
    }
  };

  getNewPicture = () => {
    new Dropbox(this.accessToken)
      .filesListFolder({ path: config.path })
      .then(this.process, console.error);
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  process = result => {
    const entry =
      result.entries[Math.floor(Math.random() * result.entries.length)];

    new Dropbox(this.accessToken)
      .filesGetTemporaryLink({ path: entry.path_lower })
      .then(image => {
        this.setState({ imageUrl: image.link });
      }, console.error);
    // const entry = `https://via.placeholder.com/${getRandomInt(100,1000)}x${getRandomInt(100,1000)}`
    // this.setState({ imageUrl: entry });
  };

  render() {
    const { imageUrl } = this.state;
    return this.error ? (
      <div>Error: Access token not supplied via URL or config.js.</div>
    ) : (
      <div className="App">
        {imageUrl && <Image uri={imageUrl} />}
        <Timer tick={this.getNewPicture} />
      </div>
    );
  }
}

export default App;
