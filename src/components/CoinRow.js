/**
 * Created by nasir on 29/09/2017.
 */

import React from 'react';
import {Link} from 'react-router-dom';

export default class CoinRow extends React.Component {
  render() {
    const { coin, currency }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];
    const marketCap = coin[`market_cap_${currLow}`];

    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)
    return (
        <tr >
          <td>{icon}</td>
          <td><Link to={`/coin/${coin.id}`}><h4>{coin.symbol}</h4></Link></td>
          <td>{price}</td>
          <td>{marketCap}</td>
          <td>{coin.percent_change_24h}%</td>
        </tr>
    )
  }
}
