/**
 * Created by nasir on 29/09/2017.
 */

import React from 'react';
import {Table} from 'reactstrap';

export default class CoinRow extends React.Component {
 render() {
   return(
       <tr>
         <td><h4><img width="40"
                      src="https://cdn.iconscout.com/public/images/icon/free/png-128/bitcoin-logo-online-payment-brand-3978d8ba010efbbd-128x128.png"/>
           BTC</h4></td>
         <td>3000 €</td>
         <td>2.121213</td>
         <td>+22</td>
       </tr>
   )
 }
}
