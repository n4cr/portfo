/**
 * Created by nasir on 29/09/2017.
 */
import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow'

export default class CoinList extends React.Component {
  render() {

    const rows = this.props.list.map((row) => <CoinRow
        currency={this.props.currency} key={row.id}
        coin={row}/>);
    return (
        <Table>
          <thead>
          <tr>
            <th></th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24hr Change (%)</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
    );
  }
}

