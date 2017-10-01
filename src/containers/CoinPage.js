/**
 * Created by nasir on 30/09/2017.
 */
import React from 'react';
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadCoin} from '../modules/coin'
import {Link} from 'react-router-dom';

class CoinPage extends React.Component {
  static PropTypes = {}

  componentDidMount() {
    this.props.loadCoin(this.props.match.params.coin);
  }

  render() {
    const props = this.props;
    const coin = props.coin;
    console.log(this.props);
    return (
        <Container>
          <Row className="mt-3">
            <Col>
              <Link to="/">← Back</Link>
            </Col>
          </Row>
          <Row className="mt-3 mb-5">
            <Col>
              <h3>{coin.name}</h3>
              This is the coin page {this.props.match.params.coin}
              Selected {this.props.coin.name}
            </Col>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <Label for="holdings">Holdings</Label>
                  <InputGroup>
                    <Input type="email" name="email" id="holdings"
                           placeholder="with a placeholder"/>
                    <InputGroupAddon>{coin.symbol}</InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  coin: state.coin.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCoin
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinPage)
