/**
 * Created by nasir on 01/10/2017.
 */
import React from 'react';
import numeral from 'numeral';
import {Form, FormGroup, Input, InputGroup, InputGroupAddon} from 'reactstrap';

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
    const signinElem = (
        <div>
          <a onClick={this.props.signin} href="#">Sign in to change</a>
        </div>
    );
    const editLink = (
        <div>
          <a onClick={this.startEdit.bind(this)} href="#">Change</a>
        </div>
    );

    const editLinkElem = (!!this.props.user ? editLink : signinElem);

    const editElem = (
        <div>
          <Form onSubmit={() => {this.save(this.props.holdingInput)}}>
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
          <div>
            <a className="mr-2" onClick={() => this.save(this.props.holdingInput)} href="#">Save</a>
            <a onClick={() => this.cancel()} href="#">Cancel</a>
          </div>
        </div>
    );

    const viewElem = (
        <div>
          <h4>{this.props.value} {coin.symbol}
            <small className="text-muted"><br/>Holdings</small>
          </h4>
          {editLinkElem}
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
