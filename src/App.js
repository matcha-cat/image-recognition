//importing necessary content for the app:
import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';

//import logo from './logo.svg';
import Logo from './components/Logo/Logo';

//importing classes for navigation and signing in:
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Navigation/Signin';
import Register from './components/Navigation/Register';
import Rank from './components/Navigation/Rank';
import ImageLinkForm from './components/Navigation/ImageLinkForm';

//importing classes for different options:
import DetectBox from './components/Options/DetectBox';
import Demographics from './components/Options/Demographics';
import Colors from './components/Options/Colors';
import Objects from './components/Options/Objects';
import Apparel from './components/Options/Apparel';
import Food from './components/Options/Food';
import SampleLinks from './components/Navigation/SampleLinks';

//setting up Clarifai api:
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'c22b12523eb44f28b7d10699ca2b6ed3',
});

//animated background:
const particlesOptions = {
  particles: {
    line_linked: {
      enable: true,
      distance: 150,
      color: '#bfc0c0',
      opacity: 1,
      width: 1,
    },
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: '#bfc0c0',
    },
    shape: {
      stroke: {
        width: 1,
        color: '#bfc0c0',
      },
    },
  },
  polygon: {
    draw: {
      enable: true,
      stroke: {
        color: '#bfc0c0',
      },
    },
  },
};

//app variables and state:
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  imgWidth: 0,
  imgHeight: 0,
  route: 'signin',
  isSignedIn: false,
  option: '',
  isLoaded: false,
  user: {
    id: '',
    name: 'Guest',
    email: '',
    entries: 0,
    joined: '',
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //loading user when signed in:
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  //changing input and imageUrl:
  onInputChange = (event) => {
    this.setState({ input: event.target.value }, console.log(''));
    this.setState({ imageUrl: event.target.value });
  };

  //this allows the content to be displayed only after the array has been passed through:
  displayContent = (boxes) => {
    this.setState({ boxes: boxes }, console.log(''));
    //fixes a small bug:
    this.setState({ isLoaded: true }, console.log(''));
  };

  //changes the route:
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState, console.log(''));
    } else if (route === 'home') {
      this.setState({ isSignedIn: true }, console.log(''));
    }
    this.setState({ route: route }, console.log(''));
  };

  //actions when one of the Options buttons is pressed:
  onButtonSubmit = (event) => {
    //resets this.state variables:
    this.setState({ boxes: [''] }, console.log(''));
    this.setState({ isLoaded: false }, console.log(''));
    this.setState(
      { option: event.target.value },
      console.log(event.target.value)
    );

    //sets image width and height (needed to display boxes on the image for some options):
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    this.setState({ imgHeight: height }, console.log(height));
    this.setState({ imgWidth: width }, console.log(width));

    //assigns a model ID depending on which Options button is clicked:
    var myOption;
    if (event.target.value === 'Faces') {
      myOption = 'c0c0ac362b03416da06ab3fa36fb58e3';
    }
    if (event.target.value === 'Demographics') {
      myOption = 'c0c0ac362b03416da06ab3fa36fb58e3';
    }
    if (event.target.value === 'Objects') {
      myOption = 'aaa03c23b3724a16a56b629203edc62c';
    }
    if (event.target.value === 'Colors') {
      myOption = 'eeed0b6733a644cea07cf4c60f87ebb7';
    }
    if (event.target.value === 'Apparel') {
      myOption = '72c523807f93e18b431676fb9a58e6ad';
    }
    if (event.target.value === 'Food') {
      myOption = 'bd367be194cf45149e75f01d59f77ba7';
    }

    //Clarifai api outputs a response using a model key:
    app.models
      .predict(myOption, this.state.input)
      .then((response) => {
        console.log(response);

        //1) Check which Option has been selected
        //2) Check if response includes an array with outputs needed
        //If there is no array, then that means nothing got detected
        //3) If there is the needed array, pass the array through displayContent function
        if (this.state.option === 'Faces') {
          if (response.outputs[0].data.regions) {
            this.displayContent(response.outputs[0].data.regions);
          }
        }
        if (this.state.option === 'Demographics') {
          if (response.outputs[0].data.regions) {
            this.displayContent(response.outputs[0].data.regions);
          }
        }
        if (this.state.option === 'Objects') {
          if (this.displayContent(response.outputs[0].data.concepts)) {
            this.displayContent(response.outputs[0].data.concepts);
          }
        }
        if (this.state.option === 'Colors') {
          if (this.displayContent(response.outputs[0].data.colors)) {
            this.displayContent(response.outputs[0].data.colors);
          }
        }
        if (this.state.option === 'Apparel') {
          if (this.displayContent(response.outputs[0].data.regions)) {
            this.displayContent(response.outputs[0].data.regions);
          }
        }
        if (this.state.option === 'Food') {
          if (this.displayContent(response.outputs[0].data.concepts)) {
            this.displayContent(response.outputs[0].data.concepts);
          }
        }
        //use a server to incriment the image count of a user
        if (response) {
          fetch('https://agile-castle-48443.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.ListeningStateChangedEvent({
      on: !this.state.on,
    });
  };

  //render all the different components
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <div>
          <Logo />
          <Navigation
            className="Navigation"
            isSignedIn={this.state.isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          <h1>Image Recognition</h1>
        </div>
        {this.state.route === 'home' ? (
          <div className="Content">
            <div className="details-options">
              <p>
                Paste the link to the image below then click on one of the
                following options (please note that some options may take a while to load):
              </p>
              <ol>
                <li> Faces: detect and show all faces in an image</li>
                <li>
                  Demographics: detect faces and output demographics for each
                  face
                </li>
                <li>
                  Objects: identify general common objects and concepts such as
                  people, emotions, places, and items
                </li>
                <li>
                  Colors: detect most popular colors in an image (in a HEX
                  format)
                </li>
                <li>
                  Apparel: identify possible apparel items such as clothing and
                  accessories
                </li>
                <li> Food: identify possible food items</li>
              </ol>
            </div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <SampleLinks />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {this.state.isLoaded === false && (
              <div className="myImage">
                <img
                  id="inputimage"
                  alt=""
                  src={this.state.imageUrl}
                  width="500px"
                  height="auto"
                />
              </div>
            )}
            {this.state.option === 'Faces' && this.state.isLoaded === true && (
              <DetectBox
                boxes={this.state.boxes}
                imageUrl={this.state.imageUrl}
                myHeight={this.state.imgHeight}
                myWidth={this.state.imgWidth}
              />
            )}
            {this.state.option === 'Demographics' &&
              this.state.isLoaded === true && (
                <Demographics
                  boxes={this.state.boxes}
                  imageUrl={this.state.imageUrl}
                  myHeight={this.state.imgHeight}
                  myWidth={this.state.imgWidth}
                />
              )}

            {this.state.option === 'Colors' && this.state.isLoaded === true && (
              <Colors boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
            )}

            {this.state.option === 'Objects' &&
              this.state.isLoaded === true && (
                <Objects
                  boxes={this.state.boxes}
                  imageUrl={this.state.imageUrl}
                />
              )}
            {this.state.option === 'Apparel' &&
              this.state.isLoaded === true && (
                <Apparel
                  boxes={this.state.boxes}
                  imageUrl={this.state.imageUrl}
                  myHeight={this.state.imgHeight}
                  myWidth={this.state.imgWidth}
                />
              )}
            {this.state.option === 'Food' && this.state.isLoaded === true && (
              <Food boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
            )}
          </div>
        ) : this.state.route === 'signin' ? (
          <div>
            <div className="AppWelcome">
              <p>
                Welcome to this image recognition app. It allows the user to
                submit an image link and press one of the options to detect
                objects in that image. The results are calculated by artificial
                intelligence models made by Clarifai (
                <a href="https://www.clarifai.com/">
                  {' '}
                  https://www.clarifai.com/{' '}
                </a>
                ). Details of the specific models used for this app can be found
                here:{' '}
                <a href="https://www.clarifai.com/model-gallery">
                  https://www.clarifai.com/model-gallery
                </a>
                .
              </p>
              <p>
                If you are a new user, click on "Register" if you'd like to sign
                up or "Continue as guest" to use the app without an account. If
                you are already a user, click on "Sign In" to proceed.
              </p>
            </div>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <div>
            <div className="AppWelcome">
              <p>
                Welcome to this image recognition app. It allows the user to
                submit an image link and press one of the options to detect
                objects in that image. The results are calculated by artificial
                intelligence models made by Clarifai (
                <a href="https://www.clarifai.com/">
                  {' '}
                  https://www.clarifai.com/{' '}
                </a>
                ). Details of the specific models used for this app can be found
                here:{' '}
                <a href="https://www.clarifai.com/model-gallery">
                  https://www.clarifai.com/model-gallery
                </a>
                .
              </p>
              <p>
                If you are a new user, click on "Register" if you'd like to sign
                up or "Continue as guest" to use the app without an account. If
                you are already a user, click on "Sign In" to proceed.
              </p>
            </div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;

//add <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
