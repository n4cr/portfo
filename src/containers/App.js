import React from 'react';
import {Route, Link} from 'react-router-dom'
import Home from './home'
import About from './about'
import Holding from './Holding'
import 'bootstrap/dist/css/bootstrap.css';

import {Button} from 'reactstrap';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';


const App = () => (
    <div>
      <Navbar color="faded" light toggleable>
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
      </Navbar>

      {/*<header>*/}

      {/*<button className="btn btn-primary">This button</button>*/}
      {/*<Button color="danger">Danger!</Button>*/}

      {/*</header>*/}

      <main>
        <Route exact path="/" component={Holding}/>
        <Route exact path="/about-us" component={About}/>
      </main>
    </div>
)

export default App;