import React from 'react';
import './Holding.css';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
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
import HomePageHeader from '../components/HomePageHeader'
import CurrencySelector from '../components/CurrencySelector';

class HomePage extends React.Component {
  static PropTypes = {}

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }



  render() {

    return (
        <Container>
          <Row className="mt-2">
            <Col xs="2" sm="2" className="offset-md-10">
              <CurrencySelector currency={this.props.currency}
                                onChange={this.onCurrencyChange.bind(this)}/>
            </Col>
          </Row>
          <HomePageHeader
              currency={this.props.currency}
              porfolioValueChange1h={this.props.porfolioValueChange1h}
              porfolioValueChange24h={this.props.porfolioValueChange24h}
              porfolioValueChange7d={this.props.porfolioValueChange7d}
              portfolioValue={this.props.portfolioValue}
              user={this.props.user}
          />
          <Row>
            <Col>
              <hr/>
            </Col>
          </Row>
          <Row className="mb-3 text-center">
            <Col xs="6" md="4">
              <div className="card">
                <div className="card-block">
                  <h4>Total Market Cap</h4>
                  <div>{formatMoney(this.props.currency, this.props.totalCap)}</div>
                </div>
              </div>
            </Col>
            <Col xs="6" md="4">
              <div className="card">
                <div className="card-block">
                  <h4>24h Volume</h4>
                  <div>{formatMoney(this.props.currency, this.props.totalVol24h)}</div>
                </div>
              </div>
            </Col>
            <Col xs="6" md="4">
              <div className="card">
                <div className="card-block">
                  <h4>Bitcoin Dominance</h4>
                  <div>{this.props.btcDominance}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card">
                <div className="card-block">

                  <Tabs
                      user={this.props.user}
                      currency={this.props.currency}
                      list={this.props.list}
                      holdingsList={this.props.holdingsList}
                      holdings={this.props.holdings}
                      signin={this.signin}/>
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
  totalCap: state.coin.totalCap,
  totalVol24h: state.coin.totalVol24h,
  btcDominance: state.coin.btcDominance,
  holdingsList: holdingsList(state),
  holdings: state.account.holdings,
  portfolioValue: portfolioValue(state),
  porfolioValueChange1h: porfolioValueChange(state, '1h'),
  porfolioValueChange24h: porfolioValueChange(state, '24h'),
  porfolioValueChange7d: porfolioValueChange(state, '7d'),
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
