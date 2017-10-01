/**
 * Created by nasir on 01/10/2017.
 */
import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

export default class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const currencies = [
      "USD",
      "AUD",
      "BRL",
      "CAD",
      "CHF",
      "CLP",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PKR",
      "PLN",
      "RUB",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "TWD",
      "ZAR"
    ];

    const options = currencies.map((curr) => (<option key={curr} value={curr}>{curr}</option>))
    return (
        <FormGroup>
          <Input value={this.props.currency} type="select" name="select" id="currency"
                 onChange={(e) => this.props.onChange(e.target.value)}>
            {options}
          </Input>
        </FormGroup>

    )
    // return (
    //     <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
    //       <DropdownToggle caret>
    //         USD
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem>EUR</DropdownItem>
    //         <DropdownItem>USD</DropdownItem>
    //         <DropdownItem>CNY</DropdownItem>
    //         <DropdownItem>BTC</DropdownItem>
    //       </DropdownMenu>
    //     </Dropdown>
    // );
  }
}
