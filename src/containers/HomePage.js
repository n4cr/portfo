import React from 'react';
import './Holding.css';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCurrency, loadCoinList} from '../modules/coin';
import {
  holdingsList,
  portfolioValue,
  porfolioValueChange,
  signinSuccess,
  loadHoldings
} from '../modules/account';
import numeral from 'numeral';
import {formatMoney} from '../utils';
import CoinList from '../components/CoinList'

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
        <div className="mt-4">
          <p>To manage your portfolio please <a onClick={this.signin} href="#">log in to
            Blockstack</a></p>
        </div>
    )

    const portfoChange = (
        <span className={this.props.porfolioValueChange > 0 ? 'text-success' : 'text-danger'}>
          {formatMoney(this.props.currency, this.props.porfolioValueChange)}
          {this.props.porfolioValueChange > 0 ? '↑' : '↓'}
        </span>);
    const portfoValue = (
        <h3>{formatMoney(this.props.currency, this.props.portfolioValue)}<br/>
          <small className="text-muted">Holdings</small>
        </h3>
    )

    const portfoChangeEl = this.props.user ? (
            <h3>
              {portfoChange}<br/>
              <small className="text-muted">24h Change</small>
            </h3>
        ) : null;
    const header = !!this.props.user ? portfoValue : signInButton
    return (
        <Container>
          <Row className="mt-5 mb-5">

            <Col xs="3" sm="3">
              <div className="card">
                <div className="card-block">
                  {header}
                </div>
              </div>
            </Col>
            <Col xs="3" sm="5">
              {portfoChangeEl}
            </Col>
            <Col xs="2" sm="2">
              <CurrencySelector currency={this.props.currency}
                                onChange={this.onCurrencyChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr/>
            </Col>
          </Row>
          <Row className="mb-3 text-center">
            <Col xs="6" md="3">
              <div className="card">
                <div className="card-block">
                  <h4>Total Market Cap</h4>
                  <div>$199,602,825,394</div>
                </div>
              </div>
            </Col>
            <Col xs="6" md="3">
              <div className="card">
                <div className="card-block">
                  <h4>24h Volume</h4>
                  <div>$199,602,825,394</div>
                </div>
              </div>
            </Col>
            <Col xs="6" md="3">
              <div className="card">
                <div className="card-block">
                  <h4>Bitcoin Dominance</h4>
                  <div>20%</div>
                </div>
              </div>
            </Col>
            <Col xs="6" md="3">
              <div className="card">
                <div className="card-block">
                  <h4>Something else</h4>
                  <div>great!</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card">
                <div className="card-block">
                  <CoinList
                      holdings={this.props.holdings}
                      currency={this.props.currency}
                      list={this.props.list}/>
                </div>
              </div>

            </Col>

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
  porfolioValueChange: porfolioValueChange(state),
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
