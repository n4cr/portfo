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

class HomePage extends React.Component {
  static PropTypes = {}


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }



  render() {

    return (
        <Container>
          <HomePageHeader
              currency={this.props.currency}
              porfolioValueChange={this.props.porfolioValueChange}
              portfolioValue={this.props.portfolioValue}
              user={this.props.user}
              changeCurrency={this.props.changeCurrency}
              loadCoinList={this.props.loadCoinList}
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
            {/*<Col xs="6" md="3">*/}
              {/*<div className="card">*/}
                {/*<div className="card-block">*/}
                  {/*<h4>Something else</h4>*/}
                  {/*<div>great!</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</Col>*/}
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
