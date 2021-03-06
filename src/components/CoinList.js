/**
 * Created by nasir on 29/09/2017.
 */
import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow'

export default class CoinList extends React.Component {
  render() {

    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <CoinRow
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);
    return (
        <Table striped size="sm">
          <thead>
          <tr>
            <th>Coin</th>
            <th></th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24hr Change (%)</th>
            <th>Volume</th>
            {/*<th>Supply</th>*/}
            {/*<th>Watch</th>*/}
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
    );
  }
}

