/**
 * Created by nasir on 12/11/2017.
 */
import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import {formatMoney} from '../utils';

export default  class HomePageHeader extends React.Component {


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }


  render() {

    const signinBlock = (
        <Row className="mb-3">
          <Col className="text-center">
            <p>To manage your portfolio, you need to sign in with <a href="#">BlockStack</a></p>
            <Button onClick={this.signin} color="success" size="lg" outline>Sign in with
              Blockstack</Button>
          </Col>
        </Row>
    );


    if (!this.props.user) {
      return signinBlock;
    }
    const portfoValue = (
        <h3>{formatMoney(this.props.currency, this.props.portfolioValue)}<br/>
          <small className="text-muted">Holdings</small>
        </h3>
    );

    const portfoChangeEl = (interval) => {
      let val;
      if (interval === '1h') {
        val = this.props.porfolioValueChange1h
      } else if (interval === '24h') {
        val = this.props.porfolioValueChange24h
      } else if (interval === '7d') {
        val = this.props.porfolioValueChange7d
      } else
        return null;

      return (
          <h3>
              <span
                  className={val > 0 ? 'text-success' : 'text-danger'}>
                {formatMoney(this.props.currency, Math.abs(val))} &nbsp;
                {val > 0 ? (<i className="fa fa-caret-up"/>) : <i className="fa fa-caret-down"/>}
              </span>
            <br/>
            <small className="text-muted">{interval} Change</small>
          </h3>
      )
    };


    const portfo = (
        <Row className="mb-3">

          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {portfoValue}
              </div>
            </div>
          </Col>
          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {portfoChangeEl('1h')}
              </div>
            </div>
          </Col>
          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {portfoChangeEl('24h')}
              </div>
            </div>
          </Col>
          <Col xs="3" sm="3">
            <div className="card">
              <div className="card-block">
                {portfoChangeEl('7d')}
              </div>
            </div>
          </Col>

        </Row>
    )

    return !!this.props.user ? portfo : signinBlock;
  }
}
