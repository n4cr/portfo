/**
 * Created by nasir on 29/09/2017.
 */

import React from 'react';
import {Link} from 'react-router-dom';

export default class CoinRow extends React.Component {
  render() {
    const coin = this.props.coin;
    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)
    return (
        <tr >
          <td>{icon}</td>
          <td><Link to={`/coin/${coin.symbol}`}><h4>{coin.symbol}</h4></Link></td>
          <td>{coin.price_usd}</td>
          <td>{coin.market_cap_usd}</td>
          <td>{coin.percent_change_24h}</td>
        </tr>
    )
  }
}
