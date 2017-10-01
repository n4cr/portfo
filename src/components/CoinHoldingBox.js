/**
 * Created by nasir on 01/10/2017.
 */
import React from 'react';
import numeral from 'numeral'

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

export default class CoinHoldingBox extends React.Component {
  static PropTypes = {}

  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  startEdit() {
    this.props.updateHoldingInput(this.props.value);
    this.setState({
      isEditing: true
    })
  };

  inputChange(e) {
    this.setState({
      ...this.state,
    })
  }

  save(value) {
    this.setState({
      ...this.state,
      isEditing: false
    })
    this.props.onSave(this.props.coin.id, value)
  };

  cancel() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  };

  render() {
    const coin = this.props.coin;
    const holdingValue = numeral(this.props.value) * numeral(this.coin);
    const editElem = (
        <div>
          <Form>
            <h4>
              <FormGroup>
                <InputGroup>
                  <Input value={this.props.holdingInput}
                         onChange={(e) => this.props.updateHoldingInput(e.target.value)}
                         name="holdings" id="holdings"
                         placeholder="Enter amount"/>

                  <InputGroupAddon>{coin.symbol}</InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <small className="text-muted">Holdings</small>
            </h4>
          </Form>
          <a onClick={() => this.save(this.props.holdingInput)} href="#">Save</a>
          <a onClick={() => this.cancel()} href="#">Cancel</a>
        </div>
    );

    const viewElem = (
        <div>
          <h4>{this.props.value} {coin.symbol}
            <small className="text-muted"><br/>Holdings</small>
          </h4>
          <a onClick={this.startEdit.bind(this)} href="#">Change</a>
        </div>
    );

    const element = this.state.isEditing ? editElem : viewElem;
    return (
        <div>
          {element}
        </div>
    )
  }
}
