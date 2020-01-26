import React, { Component } from "react";
// import { Dropbox } from 'dropbox';
import Ticker from "react-ticker";
import Image from "./Image";
import "./App.css";
import config from "./config";
import DOG from "./DOG";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    super(props);
    // this.accessToken = {
    //   accessToken: new URL(window.location).searchParams.get('accessToken')
    // };

    // if (this.accessToken.accessToken === null) {
    //   this.accessToken = config.accessToken;
    // }

    // if (this.accessToken.accessToken === null) {
    //   this.error = 'Error: Access token not supplied via URL or config.js.';
    // }

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
    // this.dropbox = new Dropbox(this.accessToken);

    const pictureInterval =
      new URL(window.location).searchParams.get("timeout") || config.timeout;

    this.getNewPicture();
    setInterval(this.getNewPicture, pictureInterval);

    this.getTickerText();
    setInterval(this.getTickerText, 60000);

    setTimeout(() => {
      window.location.reload();
    }, 3600000); // Refresh page every hour
  }

  state = {
    imageUrl: null,
    blackout: false,
    tickerText: ["Loading"]
  };

  // accessToken = null;
  error = null;
  startMoment = null;
  stopMoment = null;

  checkClock = () => {
    console.log(
      `Checking clock with startMoment: ${this.startMoment}, stopMoment: ${this.stopMoment}`
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
    let result = parseInt(split[0], 10) * 60 + parseInt(split[1], 10);
    return result;
  };

  getNewPicture = () => {
    console.log("getnewpicture");
    fetch(config.url)
      .then(res => res.json())
      .then(this.process, console.error);
    // this.dropbox
    //   .filesListFolder({ path: config.path })
    //   .then(this.process, console.error);
  };

  getTickerText = () => {
    console.log("getTickerText");
    fetch(config.url + "ticker.txt")
      .then(res => res.text())
      .then(res => {
        const tickerText = res.split("\n").filter(line => line !== "");
        this.setState({ tickerText });
      });
    // this.dropbox
    //   .filesDownload({ path: config.path + '/ticker.txt' })
    //   .then(file => {
    //     const reader = new FileReader();
    //     reader.readAsText(file.fileBlob);
    //     reader.onload = () => {
    //       const tickerText = reader.result
    //         .split('\n')
    //         .filter(line => line !== '');
    //       this.setState({ tickerText });
    //     };
    //   }, console.error);
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  process = entries => {
    function getEntry() {
      return entries[Math.floor(Math.random() * entries.length)];
    }

    const entry = getEntry();
    console.log("process", config.url + entry);
    this.setState({ imageUrl: config.url + entry });

    // while (entry.name === "ticker.txt") {
    //   entry = getEntry();
    // }

    // this.dropbox
    //   .filesGetTemporaryLink({ path: entry.path_lower })
    //   .then(image => {
    //     this.setState({ imageUrl: image.link });
    //   }, console.error);
    // const entry = `https://via.placeholder.com/${getRandomInt(100,1000)}x${getRandomInt(100,1000)}`
    // this.setState({ imageUrl: entry });
  };

  render() {
    const { imageUrl, blackout, tickerText } = this.state;
    if (this.error) {
      return <div>{this.error}</div>;
    } else if (blackout) {
      return <div className="blackout" />;
    }
    return (
      <div className="App">
        <Clock />
        <DOG />
        {imageUrl && <Image uri={imageUrl} />}
        <div
          style={{
            position: "fixed",
            bottom: 10,
            width: "100%",
            color: "white",
            backgroundColor: "#191970",
            fontSize: "2em",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >
          <span
            style={{
              width: "100%",
              display: "inline-block",
              paddingTop: 10
            }}
          >
            <Ticker offset="run-in" speed={5}>
              {() => tickerText.join(" · ") + " · "}
            </Ticker>
          </span>
        </div>
        {/* <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            backgroundColor: '#d69cbc',
            fontSize: '3em',
            borderRadius: '0 20px 0 0',
            padding: '5px 10px 5px 0'
          }}
        >
          Breaking News:
        </div> */}
      </div>
    );
  }
}

export default App;
