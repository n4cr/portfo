/**
 * Created by nasir on 29/09/2017.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral'


export default class CoinRow extends React.Component {
  render() {
    const { coin, currency }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];
    const formatted_price = numeral(price).format('0.0000');
    const marketCap = numeral(coin[`market_cap_${currLow}`]).format('0.0a');

    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)
    return (
        <tr >
          <td>{icon}</td>
          <td><Link to={`/coin/${coin.id}`}><h4>{coin.symbol}</h4></Link></td>
          <td>{formatted_price}</td>
          <td>{marketCap}</td>
          <td>{coin.percent_change_24h}%</td>
        </tr>
    )
  }
}
