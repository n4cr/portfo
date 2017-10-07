import React from 'react';
import './Holding.css';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCurrency, loadCoinList} from '../modules/coin';
import {holdingsList, portfolioValue, signinSuccess, loadHoldings} from '../modules/account';

import {currencySymbols} from '../utils';

class HomePage extends React.Component {
  static PropTypes = {}


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  render() {
    const signInButton = (
        <Container>
          <div className="mt-4">
            <p>To manage your portfolio please <a onClick={this.signin} href="#">log in to Blockstack</a></p>
          </div>
        </Container>
    )

    const portfoValue = (
        <h3>{currencySymbols[this.props.currency]}{this.props.portfolioValue}<br/>
          <small className="text-muted">Holdings</small>
        </h3>
    )

    const header = !!this.props.user ? portfoValue : signInButton
    return (
        <Container>
          <Row className="mt-5 mb-5">
            <Col xs="8" sm="10">
              {header}
            </Col>
            <Col xs="4" sm="2">
              <CurrencySelector currency={this.props.currency}
                                onChange={this.onCurrencyChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Tabs
                currency={this.props.currency}
                list={this.props.list}
                holdingsList={this.props.holdingsList}
                holdings={this.props.holdings}
                signin={this.signin}
            />
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
  holdingsList: holdingsList(state),
  holdings: state.account.holdings,
  portfolioValue: portfolioValue(state),
  currency: state.coin.currency,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCurrency,
  loadCoinList,
  signinSuccess,
  loadHoldings,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
