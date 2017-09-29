import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import CoinList from './CoinList'

export default class Tabs extends React.Component {
  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  signOut() {

    window.blockstack.signUserOut(window.location.href)
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };

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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  save() {
    window.blockstack.putFile('newfile.json', JSON.stringify({ content: 'kirikhan' }))

  }

  fetchData() {
    window.blockstack.getFile('newfile.json')
        .then((todosText) => {
          console.log(todosText)
        })
  }

  render() {
    return (
        <div className="container">
          <Nav tabs className="nav-justified">
            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => {
                    this.toggle('1');
                  }}
              >
                Top Coins
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => {
                    this.toggle('2');
                  }}
              >
                Holdings
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CoinList />
                  {/*<p>*/}
                    {/*<Button color="success" onClick={() => this.save()}>Content</Button>*/}
                    {/*<button className="btn btn-default" onClick={() => this.signin()}>Sign In With*/}
                      {/*Blockstack*/}
                    {/*</button>*/}
                    {/*<button className="btn btn-default" onClick={() => this.signOut()}>Signout*/}
                    {/*</button>*/}
                  {/*</p>*/}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="6">
                  <Card block>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional
                      content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card block>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional
                      content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
    );
  }
}