import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import TradeItem from './TradeItem'

export default class Trades extends Component {
  state = {
    trades: [],
    error: ""
  }
  
  getTrades() {
    const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/trades`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        trades: json.trades
      })
    })
  }    
  componentWillMount() {
    this.getTrades()
  }
  
  render() {
    let outp = (<div></div>)
    if(this.state.trades === [] || this.state.trades === undefined) {
      outp = (<div>NOTHING TO DISPLAY</div>)
    } else {
      outp = (
        <TradeItem setChartsTicker={this.props.setChartsTicker} items = {this.state.trades}/>
      )
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Trade Cost</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {outp}
        </tbody>
      </table>
    )
  }
}
  