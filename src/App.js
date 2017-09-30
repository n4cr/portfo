import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


window.blockstack = require('blockstack')
window.blockstackStorage = require('blockstack-storage')
window.axios = require('axios')

class App extends Component {

  signOut() {

    window.blockstack.signUserOut(window.location.href)
  }

  constructor() {
    super()
    let user;
    const blockstack = window.blockstack

    if (blockstack.isUserSignedIn()) {
      user = blockstack.loadUserData().profile
      console.log(user);
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
          .then((userData) => {
            console.log(userData)
            window.location = window.location.origin
          })
    }
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            <button className="btn btn-default" onClick={() => this.signin()}>Sign In With Blockstack
            </button>
            <button className="btn btn-default" onClick={() => this.signOut()}>Signout
            </button>
          </p>
        </div>
    );
  }
}

export default App;
