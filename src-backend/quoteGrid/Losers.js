import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import ListItem from './ListItem'

export default class Losers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      losersQuotes: null,
    };
  }
  
  losersQuotes() {
    const endpoint = `/api/stocks/list/losers`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        losersQuotes: json.losers
      })
    })
  }
  componentWillMount() {
    this.losersQuotes()
  }
  
  render() {
    let outp = (<div></div>)
    if(this.state.losersQuotes === null || this.state.losersQuotes === undefined) {
      outp = (<div></div>)
    } else {
        outp = (
          <ListItem items = {this.state.losersQuotes} addSymbol={this.props.addSymbol} activeTickers = {this.props.activeTickers}/>
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
            <th>to list</th>
          </tr>
        </thead>
        <tbody>
          {outp}
        </tbody>
      </table>
    )
  }
}