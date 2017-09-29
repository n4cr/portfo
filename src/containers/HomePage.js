import React from 'react';
import './Holding.css';
import {Row,Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';

export default class HomePage extends React.Component {
  static PropTypes = {}

  render() {
    return (
        <Container>
          <Row>
            <Col xs="6" sm="4">
              <h3>3000 € <br/>
                <small className="text-muted">Holdings</small>
              </h3>
            </Col>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col sm="4">.col .col-sm-4</Col>
          </Row>
          <Row>
            <Tabs/>
          </Row>
        </Container>
    )
  }
}
