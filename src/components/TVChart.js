/**
 * Created by nasir on 03/10/2017.
 */
import React from 'react';
export default class TVChart extends React.Component {

  componentDidMount() {

    const currency= this.props.currency;

    const initScript = document.createElement("script");
    initScript.type = "text/javascript";
    // initScript.innerHTML = 'new TradingView.MediumWidget({"container_id": "tv-medium-widget-a8ae1","symbols": [  "KRAKEN:XRPEUR|1y"],"gridLineColor": "#e9e9ea","fontColor": "#83888D","underLineColor": "#dbeffb","trendLineColor": "#4bafe9","width": "100%","height": "400px","locale": "en"})'
    initScript.innerHTML  = `new TradingView.widget({"width": 1080,"height": 610,"symbol": "BTC${currency}","interval": "D","timezone": "Etc/UTC","theme": "Light","style": "1","locale": "en","toolbar_bg": "#f1f3f6","enable_publishing": false,"allow_symbol_change": true,"hideideas": true});`

    document.body.appendChild(initScript);

  }

  render() {
    return (
        <div id="tv-medium-widget-a8ae1"></div>

    )
  }

}



