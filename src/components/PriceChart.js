import React from 'react';
// import PropTypes from "prop-types";
import {scaleTime} from 'd3-scale';
import {timeFormat} from 'd3-time-format';
import {format} from 'd3-format';
import {ChartCanvas, Chart} from 'react-stockcharts';
import {LineSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {last, first, timeIntervalBarWidth} from 'react-stockcharts/lib/utils';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';
import Loading from './Loading';


class PriceChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      period: 300
    }
  }

  changePeriod(period) {
    this.props.clearChart();
    this.setState({
      period: period
    });
    this.props.loadCoinChartData(this.props.coin.symbol, period);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.coin.id != nextProps.coin.id || this.state.period != nextState.period || this.props.data.length != nextProps.data.length;
  }

  render() {
    console.log('rerendering the chart...');
    const { width, ratio, data } = this.props;

    const xAccessor = (d) => {

      return d ? new Date(d.date * 1000) : null
    };
    const xExtents = [
      xAccessor(first(data)),
      xAccessor(last(data))
    ];

    const periods = [[300, '5m'], [900, '15m'], [1800, '30m'], [7200, '2h'], [14400, '4h'], [86400, '1d']];
    const periodLinks = periods.map((p) => {
      return p[0] === this.state.period ? (
              <span className="mr-3"><strong>{p[1]}</strong></span>) : (
              <a className="mr-3" href="#"
                 onClick={() => this.changePeriod(p[0])}>{p[1]}</a>
          )
    });
    return data.length === 0 ? <h3 className="mt-5 text-center"><Loading/></h3> : (
            <div>
              <div className="text-right">
                {periodLinks}
              </div>
              <ChartCanvas width={width} height={400} ratio={ratio}
                           panEvent={false}
                           zoomEvent={false}
                           margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                           seriesName="MSFT"
                           data={data} type="svg"
                           xAccessor={xAccessor}
                           xScale={scaleTime()}
                           xExtents={xExtents}>
                <Chart id={0} yExtents={d => [d.close / 1.1, d.close]} yPan={true}>
                  <XAxis axisAt="bottom" orient="bottom" ticks={10}/>
                  <YAxis axisAt="left" orient="left"/>
                  <LineSeries yAccessor={d => d.close}/>
                  <MouseCoordinateX
                      at="bottom"
                      orient="bottom"
                      displayFormat={timeFormat("%Y-%m-%d")}/>
                  <MouseCoordinateY
                      at="right"
                      orient="right"
                      displayFormat={format(".2f")}/>

                </Chart>
                <CrossHairCursor />

              </ChartCanvas>
            </div>
        );
  }
}


// PriceChart.propTypes = {
//   data: PropTypes.array.isRequired,
//   width: PropTypes.number.isRequired,
//   ratio: PropTypes.number.isRequired,
//   type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

PriceChart.defaultProps = {
  type: "svg",
};
PriceChart = fitWidth(PriceChart);

export default PriceChart;