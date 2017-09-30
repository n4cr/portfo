/**
 * Created by nasir on 30/09/2017.
 */
import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';

export default class CoinPage extends React.Component {
  static PropTypes = {}

  render() {
    const props = this.props;
    return (
        <Container>
          <Row className="mt-5 mb-5">
            <Col>
              This is the coin page {this.props.match.params.coin}
            </Col>
          </Row>
        </Container>
    )
  }
}
