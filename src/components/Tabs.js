import React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import CoinList from './CoinList';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
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
                  <CoinList currency={this.props.currency} list={this.props.list}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <CoinList currency={this.props.currency} list={this.props.holdingsList}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
    );
  }
}