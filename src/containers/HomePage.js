import React from 'react';
import './Holding.css';
import {Row,Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changeCurrency, loadCoinList} from '../modules/coin'

class HomePage extends React.Component {
  static PropTypes = {}

  onCurrencyChange (currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  render() {
    return (
        <Container>
          <Row className="mt-5 mb-5">
            <Col xs="8" sm="10">
              <h3>3000 € <br/>
                <small className="text-muted">Holdings</small>
              </h3>
            </Col>
            <Col xs="4" sm="2">
              <CurrencySelector currency={this.props.currency} onChange={this.onCurrencyChange.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Tabs currency={this.props.currency} list={this.props.list}/>
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
  currency: state.coin.currency,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCurrency,
  loadCoinList,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
