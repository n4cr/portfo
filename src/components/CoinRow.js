/**
 * Created by nasir on 29/09/2017.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {formatMoney} from '../utils';


export default class CoinRow extends React.Component {
  render() {
    const { coin, currency, holdings }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];
    const formatted_price = formatMoney(currency, price);
    const marketCap = formatMoney(currency, coin[`market_cap_${currLow}`]);


    const changeColor = +coin.percent_change_24h > 0 ? "text-success" : "text-danger";
    const coinPerc = +coin.percent_change_24h > 0 ? "+" + coin.percent_change_24h : coin.percent_change_24h;

    const holdingElem = holdings && holdings > 0 ? (<span>{holdings} {coin.symbol}</span>) : (
            <span>-</span>);
    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)

    // TODO: reused this across all pages. currently duplicated
    const value_in_currency = !!holdings && holdings > 0 ? holdings * price : 0;
    const valueElem = value_in_currency > 0 ? (
            <span>{formatMoney(currency, value_in_currency)}</span>) : null;

    const change_24h = holdings > 0 ? (
            <span>
          {formatMoney('', coin.percent_change_24h / 100 * holdings * price)}
              {+coin.percent_change_24h > 0 ? '⬆' : '⬇'}
        </span>
        ) : null;
    const volume = formatMoney(currency, coin[`24h_volume_${currLow}`]);

    return (
        <tr >
          <td>{icon}</td>
          <td><Link to={`/coin/${coin.id}`}>
            <h6>{coin.name}<br/>
              <small className="text-muted">{coin.symbol}</small>
            </h6>
          </Link></td>
          <td>{formatted_price}</td>
          <td>{marketCap}</td>
          <td className={changeColor}>{coinPerc}%</td>
          <td>{volume}</td>
          {/*<td>*/}
          {/*</td>*/}
          {/*<td><i className="fa fa-eye-slash"/> </td>*/}

        </tr>
    )
  }
}
