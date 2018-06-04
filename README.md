 [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# Dropbox Photo Frame
A digital photo frame that uses Dropbox for displaying the pictures. Used with a Raspberry pi zero or anything with a webbrowser, node runtime and a display.

This doesn't sync the files locally, but fetches them with the DropBox preview link.

## Setup

The application is a small React app that generates a website in the `build` directory. When using a Raspberry Pi, you can use [the following guide](https://die-antwort.eu/techblog/2017-12-setup-raspberry-pi-for-kiosk-mode/) for setting up a fullscreen chromium webbrowser, aka kiosk mode.

Clone the repo and run either `npm install` or `yarn` to install the dependencies. 

Edit the file `src/config.js` to add your DropBox access token. You can the instructions to generate one [here](https://blogs.dropbox.com/developers/2014/05/generate-an-access-token-for-your-own-account/). In the config you can also set the timeout in miliseconds and the path to the directory of your pictures.

_Note: This directory should only contain pictures._

Then run `npm build` or `yarn build` to transpile the code to the `build` directory.

For my Raspberry Pi zero w I installed Apache2 and symlinked the `build` directory to `/var/www/html`.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

