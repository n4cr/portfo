import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
export default () => (
    <Container>
      <Row className="mt-3">
        <Col>
          <Link to="/">← Back</Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3>About</h3>
        <p>Portfo is a cryptocurrency portfolio tracker on top
          of <a target="_blank"    href="https://blockstack.org">Blockstack</a> platform.
          By using portfo, all your data will be encrypted and stored on a storage of your choosing.
        </p>
        <p>If you have any suggestions or want to report an issue or say hi just hit me up on <a
            href="https://twitter.com/n4cr">twitter</a>. </p>
      </Row>
    </Container>
)
