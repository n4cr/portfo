/**
 * Created by nasir on 29/09/2017.
 */
import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow'

export default class CoinList extends React.Component {
  render() {
    return (
        <Table hover>
          {/*<thead>*/}
          {/*<tr>*/}
            {/*<th></th>*/}
            {/*<th>Price</th>*/}
            {/*<th>Holdings</th>*/}
            {/*<th>24hr Change</th>*/}
          {/*</tr>*/}
          {/*</thead>*/}
          <tbody>
          <CoinRow/>
          <CoinRow/>
          <CoinRow/>
          </tbody>
        </Table>
    );
  }
}

