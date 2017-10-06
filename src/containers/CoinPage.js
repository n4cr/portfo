/**
 * Created by nasir on 30/09/2017.
 */
import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CoinHoldingBox from '../components/CoinHoldingBox';
import {updateHoldings} from '../modules/account';
import {loadCoin, loadCoinChartData, clearChart, loadOrderBook} from '../modules/coin';
import {updateHoldingInput} from '../modules/ui';
import numeral from 'numeral';
import CoinPageTabs from '../components/CoinPageTabs';

class CoinPage extends React.Component {
  static PropTypes = {}

  componentDidMount() {
    this.props.loadCoin(this.props.match.params.coin, this.props.currency);
  }

  signin() {
    const blockstack = window.blockstack;
    blockstack.redirectToSignIn();
  }

  render() {
    const props = this.props;
    const coin = props.coin;
    const holdings = props.holdings;
    const amount = !!coin && coin.id && holdings && holdings[coin.id] ? holdings[coin.id] : 0;
    const currency = this.props.currency;
    const price = coin['price_' + currency.toLowerCase()];
    const value_in_currency = !!amount ? amount * price : 0;
    const market_cap = numeral(coin['market_cap_' + currency.toLowerCase()]).format('0.0a');
    const volume = numeral(coin['24h_volume_' + currency.toLowerCase()]).format('0.0a');
    const change_1h = coin['percent_change_1h'];
    const change_24h = coin['percent_change_24h'];
    const change_7d = coin['percent_change_7d'];


    return (
        <Container>
          <Row className="mt-3">
            <Col>
              <Link to="/">← Back</Link>
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col>

              <h2>{coin.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="8" md="4">
              <CoinHoldingBox
                  coin={coin}
                  value={amount}
                  holdingInput={this.props.holdingInput}
                  updateHoldingInput={this.props.updateHoldingInput}
                  onSave={this.props.updateHoldings}
                  user={this.props.user}
                  signin={this.signin}
              />
            </Col>
            <Col>
              <h4>{value_in_currency}
                <small className="text-muted"><br/>Value in {currency}</small>
              </h4>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h6>
                Current Price<br/>
                <small className="text-muted">{price} {currency}</small>
              </h6>
            </Col>
            <Col>
              <h6>
                Market Cap<br/>
                <small className="text-muted">{market_cap} {currency}</small>
              </h6>
            </Col>
            <Col>
              <h6>
                24 Hour Volume<br/>
                <small className="text-muted">{volume} {currency}</small>
              </h6>
            </Col>
            <Col>
              <div>
                <small>1H {change_1h}%</small>
              </div>
              <div>
                <small>24H {change_24h}%</small>
              </div>
              <div>
                <small>7D {change_7d}%</small>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <CoinPageTabs
                  coinChartData={this.props.coinChartData}
                  coin={this.props.coin}
                  loadCoinChartData={this.props.loadCoinChartData}
                  clearChart={this.props.clearChart}
                  orderBookData={this.props.orderBookData}
                  loadOrderBook={this.props.loadOrderBook}
              />
            </Col>
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  coin: state.coin.selected,
  holdings: state.account.holdings,
  holdingInput: state.ui.holdingInput,
  currency: state.coin.currency,
  user: state.account.user,
  coinChartData: state.coin.chartData,
  orderBookData: state.coin.orderBookData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCoin,
  loadCoinChartData,
  loadOrderBook,
  updateHoldings,
  updateHoldingInput,
  clearChart,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinPage)
