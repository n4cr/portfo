/**
 * Created by nasir on 30/09/2017.
 */
import React from 'react';
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadCoin} from '../modules/coin';
import {Link} from 'react-router-dom';
import CoinHoldingBox from '../components/CoinHoldingBox';
import {updateHoldings} from '../modules/account'
import {updateHoldingInput } from '../modules/ui'

class CoinPage extends React.Component {
  static PropTypes = {}

  componentDidMount() {
    this.props.loadCoin(this.props.match.params.coin);
  }

  render() {
    const props = this.props;
    const coin = props.coin;
    const holdings = props.holdings;

    const amount = !!coin && coin.id && holdings ? holdings[coin.id] : 0 // holdings[coin.symbol] || 0;
    return (
        <Container>
          <Row className="mt-3">
            <Col>
              <Link to="/">← Back</Link>
            </Col>
          </Row>
          <Row className="mt-3 mb-5">
            <Col>

              <h2>{coin.name}</h2>
              This is the coin page {this.props.match.params.coin}
              Selected {this.props.coin.name}
            </Col>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="8" md="4">
              <CoinHoldingBox
                  coin={coin}
                  value={amount}
                  holdingInput={this.props.holdingInput}
                  updateHoldingInput={this.props.updateHoldingInput}
                  onSave={this.props.updateHoldings}
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCoin,
  updateHoldings,
  updateHoldingInput,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinPage)
