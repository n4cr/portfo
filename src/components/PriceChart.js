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


class PriceChart extends React.Component {
  render() {
    const { width, ratio, data } = this.props;

    const xAccessor = (d) => {

      return d ? new Date(d.date * 1000) : null
    };
    const xExtents = [
      xAccessor(first(data)),
      xAccessor(last(data))
    ];

    return data.length === 0 ? null : (
            <div>
              <div className="text-right">
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 300)}>5m</a>
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 900)}>15m</a>
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 1800)}>30m</a>
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 7200)}>2h</a>
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 14400)}>4h</a>
                <a className="mr-3" href="#"
                   onClick={() => this.props.loadCoinChartData(this.props.coin.symbol, 86400)}>1d</a>
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