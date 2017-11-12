/**
 * Created by nasir on 12/11/2017.
 */
import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import {formatMoney} from '../utils';
import CurrencySelector from '../components/CurrencySelector';

export default  class HomePageHeader extends React.Component {
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
    );

    const portfoChange = (
        <span className={this.props.porfolioValueChange > 0 ? 'text-success' : 'text-danger'}>
          {formatMoney(this.props.currency, this.props.porfolioValueChange)}
          {this.props.porfolioValueChange > 0 ? '↑' : '↓'}
        </span>);
    const portfoValue = (
        <h3>{formatMoney(this.props.currency, this.props.portfolioValue)}<br/>
          <small className="text-muted">Holdings</small>
        </h3>
    );

    const portfoChangeEl = this.props.user ? (
            <h3>
              {portfoChange}<br/>
              <small className="text-muted">24h Change</small>
            </h3>
        ) : null;
    const header = !!this.props.user ? portfoValue : signInButton;
    const changeEl = !!this.props.user ? portfoChangeEl : signInButton;
    return (
        <Row className="mt-5 mb-3">

          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {header}
              </div>
            </div>
          </Col>
          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {changeEl}
              </div>
            </div>
          </Col>
          <Col xs="2" sm="2" className="offset-md-4">
            <CurrencySelector currency={this.props.currency}
                              onChange={this.onCurrencyChange.bind(this)}/>
          </Col>
        </Row>
    )
  }
}
