import React from 'react';
import {Route, Link} from 'react-router-dom';
import About from './about';
import '../App.css';
import HomepPage from './HomePage';
import CoinPage from './CoinPage';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from 'reactstrap';
import {signinSuccess, signout} from '../modules/account'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


window.blockstack = require('blockstack')
window.blockstackStorage = require('blockstack-storage')
window.axios = require('axios')

const STORAGE_FILE = 'todos.json';

class App extends React.Component {


  constructor() {
    super()

    // load holdings from blockstack

  }

  componentDidMount() {
    let user;
    const blockstack = window.blockstack

    if (blockstack.isUserSignedIn()) {
      user = blockstack.loadUserData().profile
      this.props.signinSuccess(user)
      console.log(user);
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
          .then((userData) => {
            console.log(userData)
            window.location = window.location.origin

            // Store userData in Redux
          })
    }
  }

  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  signout() {
    // this.props.signout()
    window.blockstack.signUserOut(window.location.href)
  }

  render() {
    const signInButton = (
        <Button onClick={() => {
          this.signin()
        }}>SignIn</Button>
    )

    const routes = (
        <main>
          <Route exact path="/" component={HomepPage}/>
          <Route path="/coin/:coin" component={CoinPage}/>
          <Route exact path="/about-us" component={About}/>
        </main>
    )
    const user = this.props.user

    const signoutButton = user ?  (
        <NavItem>
          <Button onClick={() => this.props.signout()}>Signout</Button>
        </NavItem>
    ): null;
    const content = user === null ? signInButton : routes;
    return (
        <div className="App">
          <Navbar color="faded" light toggleable>
            <Container>
              <NavbarToggler right onClick={this.toggle}/>
              <NavbarBrand href="/">Portfo</NavbarBrand>
              <Collapse isOpen={false} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to="/">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/about-us">About</Link>
                  </NavItem>
                  {signoutButton}
                </Nav>
              </Collapse>
            </Container>

          </Navbar>

          {/*<header>*/}

          {/*<button className="btn btn-primary">This button</button>*/}


          {/*</header>*/}

          {content}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
  signedIn: state.account.signedIn,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  signinSuccess,
  signout
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
