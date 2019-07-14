import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import QuoteItem from './QuoteItem'

export default class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeQuotes: null,
      activeTickers : [],
      error: ""
    };
  }
  checkList() {
    const endpoint = `/api/active/list`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
      this.setState({
        activeTickers: json.symbols
      })
    })
  }
  getQuotes (symbols) {
    const activeTickers = symbols.join()
    const endpoint = `/api/list/${activeTickers}/quote`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        activeQuotes: json.quotes
      })
    })
  }
  componentWillMount() {
    this.checkList();
    this.getQuotes(this.props.activeTickers);
  }
  componentDidUpdate(prevProps) {
    if(this.props.activeTickers !== prevProps.activeTickers) {
      this.setState({activeTickers : this.props.activeTickers})
      this.getQuotes(this.props.activeTickers);
    } else if(this.state.activeQuotes === null && this.state.activeTickers
        || this.state.activeQuotes === undefined && this.state.activeTickers) {
      this.getQuotes(this.state.activeTickers)
    }
  }

  render() {
    let outp = (<div></div>)
    if(this.state.activeQuotes === null || this.state.activeQuotes === undefined) {
      outp = (<div></div>)
    } else {
      outp = (
        <QuoteItem
          setChartsTicker={this.props.setChartsTicker}
          items = {this.state.activeQuotes}
          delSymbol = {this.props.delSymbol}
        />
      )
    }
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>latestPrice</th>
            <th>open</th>
            <th>close</th>
            <th>high</th>
            <th>low</th>
            <th>latestVolume</th>
            <th>change</th>
            <th>changePercent</th>
            <th>marketCap</th>
            <th>peRatio</th>
            <th>week52High</th>
            <th>week52Low</th>
            <th>ytdChange</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {outp}
        </tbody>
      </table>
    )
  }
}