import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import NavBar from '../components/NavBar/NavBar';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgLinkForm from '../components/ImgLinkForm/ImgLinkForm';
import FaceDetection from '../components/FaceDetection/FaceDetection';
import Signin from '../components/Signin/Signin';
import Signup from '../components/Signup/Signup';

const app = new Clarifai.App({
 apiKey: 'abb52e751e454024a5dc3cf454ebb5b3'
});

const particlescConfig = {
  "particles": {
    "number": {
      "value": 30,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      regionInfo: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: 0,
        name: '',
        email: '',
        entries: 0,
        addedOn: '',
      }
    }
  }

  loadUser = (data) => {
    const { id, name, email, entries, addedOn } = data;
    this.setState({
      user: {
        id,
        name,
        email,
        entries,
        addedOn,
      }
    });
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  processImage = () => {
    this.setState({imageUrl: this.state.input}, () => {
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
      .then(response => {
        if(response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(user => {
              this.setState({user: {
                ...this.state.user,
                entries: user.entries
              }})
            })
        }
        this.setRegionInfo(this.calculateRegions(response))
        this.setState({input: ''});
      })
      .catch(err => console.log(err))
    });
  };

  onEnterClick = (event) => {
    if(event.key === 'Enter') {
      this.processImage();
      event.target.value = '';
    }
  };

  onButtonClick = (event) => {
    //Invoke the second function as a callback to setState, as setState happens asynchronously
    const userInput = document.querySelector('input');
    this.processImage();
    userInput.value = '';
  };

  calculateRegions = (data) => {
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;

    const originRegions = data.outputs[0].data.regions;
    const clarifaiFace = typeof originRegions !== 'undefined' ?
                          (originRegions.map(region => {
                            const boundingBox = region.region_info.bounding_box;
                            return {
                              topRow: height * boundingBox.top_row,
                              leftCol: width * boundingBox.left_col,
                              bottomRow: height - (height * boundingBox.bottom_row),
                              rightCol: width - (width * boundingBox.right_col),
                            }
                          }))
                          : [];
    return clarifaiFace;
  };

  setRegionInfo = (box) => {
    this.setState({regionInfo: box});
  }; 

onRouteChange = (route) => {
  if(route === 'home') {
    this.setState({isSignedIn: true});
  } else {
    this.setState({isSignedIn: false});
  }

  this.setState({route});
}

  render() {
    const { imageUrl, regionInfo, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Particles  className='particles' params={particlescConfig} />
        <NavBar isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :
            (
              route === 'home' ?
                <div>
                  <Logo />
                  <Rank name={user.name} entries={user.entries} />
                  <ImgLinkForm 
                    onInputChange={this.onInputChange} 
                    onEnterClick={this.onEnterClick}
                    onButtonClick={this.onButtonClick}
                  />
                </div>
              :
                <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        } 
        <FaceDetection imageUrl={imageUrl} boundingBoxes={regionInfo} />
      </div>
    );
  }
}

export default App;
