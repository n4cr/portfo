import React from 'react';
// import PropTypes from "prop-types";
import {scaleTime} from 'd3-scale';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {ChartCanvas, Chart} from 'react-stockcharts';
import {LineSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {last, first, timeIntervalBarWidth} from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';


class OrderBook extends React.Component {
  render() {
    return (
        <div>Order book</div>
    )
  }
}



export default OrderBook;