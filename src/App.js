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

  componentDidMount = () => {
    const accessToken = new URL(window.location).searchParams.get("accessToken");
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

    console.log(entry)

    new Dropbox(this.accessToken).filesGetTemporaryLink({ path: entry.path_lower })
      .then(image => {
        this.setState({ imageUrl: image.link })
      }, console.error)
  }

  render() {
    const { imageUrl, loaded } = this.state
    return (
      <div className="App" >
        {imageUrl && <Image uri={imageUrl} />}
        {loaded && <Timer tick={this.getNewPicture} />}
      </div>
    );
  }
}

export default App;
