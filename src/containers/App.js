import React from 'react';
import {Route, Link} from 'react-router-dom';
import About from './about';
// import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Example from '../components/Tabs';
import HomepPage from './HomePage';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container} from 'reactstrap';

window.blockstack = require('blockstack')
window.blockstackStorage = require('blockstack-storage')
window.axios = require('axios')

const STORAGE_FILE = 'todos.json';

class App extends React.Component {


  constructor() {
    super()

    // load holdings from blockstack

  }



  render() {
    return (
        <div>
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
                </Nav>
              </Collapse>
            </Container>

          </Navbar>

          {/*<header>*/}

          {/*<button className="btn btn-primary">This button</button>*/}


          {/*</header>*/}

          <main>
            <Route exact path="/" component={HomepPage}/>
            <Route exact path="/about-us" component={About}/>
          </main>
        </div>
    )
  }
}

export default App;