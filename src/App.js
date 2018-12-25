import React, { Component } from "react";
import { Dropbox } from "dropbox";
import Image from "./Image";
import Timer from "./Timer";
import "./App.css";
import config from "./config";

class App extends Component {
  state = {
    imageUrl: null,
    blackout: false
  };

  accessToken = null;
  error = null;
  startMoment = null;
  stopMoment = null;

  componentWillMount = () => {
    this.accessToken = {
      accessToken: new URL(window.location).searchParams.get("accessToken")
    };

    if (this.accessToken.accessToken === null) {
      this.accessToken = config.accessToken;
    }

    if (this.accessToken.accessToken === null) {
      this.error = "Error: Access token not supplied via URL or config.js.";
    }

    try {
      const startMomentString =
        new URL(window.location).searchParams.get("startMoment") ||
        config.startMoment;
      if (startMomentString !== undefined) {
        this.startMoment = this.parseMoment(startMomentString);
      }
    } catch (e) {
      this.error = "Error: invalid startMoment supplied.";
    }
    try {
      const stopMomentString =
        new URL(window.location).searchParams.get("stopMoment") ||
        config.stopMoment;
      if (stopMomentString !== undefined) {
        this.stopMoment = this.parseMoment(stopMomentString);
      }
    } catch (e) {
      console.log(e);
      this.error = "Error: invalid stopMoment supplied.";
    }

    if (this.startMoment && this.stopMoment) {
      this.checkClock();
      setInterval(this.checkClock, 60000);
    }
  };

  checkClock = () => {
    console.log(
      `Checking clock with startMoment: ${this.startMoment}, stopMoment: ${
        this.stopMoment
      }`
    );
    const now = new Date();
    const elapsedMinutes = now.getHours() * 60 + now.getMinutes();
    console.log(`Current time: ${now}, elapsedMinutes: ${elapsedMinutes}`);
    const blackout =
      elapsedMinutes < this.startMoment || elapsedMinutes > this.stopMoment;
    console.log("Blackout:", blackout);
    this.setState({ blackout });
  };

  parseMoment = moment => {
    let split = moment.split("-");
    let result = parseInt(split[0]) * 60 + parseInt(split[1]);
    return result;
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
    const { imageUrl, blackout } = this.state;
    const visible = true;
    if (this.error) {
      return <div>{this.error}</div>;
    } else if (blackout) {
      return <div className="blackout" />;
    }
    return (
      <div className="App">
        {imageUrl && <Image uri={imageUrl} />}
        <Timer tick={this.getNewPicture} />
      </div>
    );
  }
}

export default App;
