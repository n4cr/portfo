/**
 * Created by nasir on 29/09/2017.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral'
import {currencySymbols} from '../utils';


export default class CoinRow extends React.Component {
  render() {
    const { coin, currency, holdings }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];
    const formatted_price = numeral(price).format('0.0000');
    const marketCap = numeral(coin[`market_cap_${currLow}`]).format('0.0a');

    const changeColor = +coin.percent_change_24h > 0 ? "text-success" : "text-danger";
    const coinPerc = +coin.percent_change_24h > 0 ? "+" + coin.percent_change_24h : coin.percent_change_24h;

    const holdingElem = holdings && holdings > 0 ? (<span>{holdings} {coin.symbol}</span>) : (
            <span>-</span>);
    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)

    // TODO: reused this across all pages. currently duplicated
    const value_in_currency = !!holdings && holdings > 0 ? holdings * price : 0;
    const valueElem = value_in_currency > 0 ? (
            <span>{currencySymbols[currency]}{value_in_currency}</span>) : null

    return (
        <tr >
          <td>{icon}</td>
          <td><Link to={`/coin/${coin.id}`}><h4>{coin.symbol}</h4></Link></td>
          <td>{formatted_price}</td>
          <td>{marketCap}</td>
          <td className={changeColor}>{coinPerc}%</td>
          <td>
            <strong>{holdingElem}</strong><br/>
            {valueElem}
          </td>
        </tr>
    )
  }
}
