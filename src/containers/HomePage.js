import React from 'react';
import './Holding.css';
import {Row,Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class HomePage extends React.Component {
  static PropTypes = {}

  render() {
    return (
        <Container>
          <Row className="mt-5 mb-5">
            <Col xs="6" sm="4">
              <h3>3000 € <br/>
                <small className="text-muted">Holdings</small>
              </h3>
            </Col>
            <Col xs="6" sm="4"></Col>
            <Col sm="4"></Col>
          </Row>
          <Row>
            <Tabs list={this.props.list}/>
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
