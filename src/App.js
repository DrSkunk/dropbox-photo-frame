import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
import Image from './Image';
import Timer from './Timer';
import './App.css';

class App extends Component {

  state = {
    imageUrl: null,
    loaded: false
  }

  accessToken = null;
  timeout = null;

  componentDidMount = () => {
    const searchParams = new URL(window.location).searchParams;
    const accessToken = searchParams.get("accessToken");
    this.timeout = searchParams.get("timeout");
    this.accessToken = { accessToken };
    this.setState({ loaded: true });
  };

  getNewPicture = () => {
    new Dropbox(this.accessToken)
      .filesListFolder({ path: '/fotos' })
      .then(this.process, console.error);

  }
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  process = (result) => {
    const entry = result.entries[Math.floor(Math.random() * result.entries.length)];

    new Dropbox(this.accessToken).filesGetTemporaryLink({ path: entry.path_lower })
      .then(image => {
        this.setState({ imageUrl: image.link })
      }, console.error)
  }

  render() {
    const { imageUrl, loaded } = this.state
    return (
      <div className="App" >
      Twerkt ze
        {imageUrl && <Image uri={imageUrl} />}
        {loaded && <Timer timeOut={this.timeout} tick={this.getNewPicture} />}
      </div>
    );
  }
}

export default App;
