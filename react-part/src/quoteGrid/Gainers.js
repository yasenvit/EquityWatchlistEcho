import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import ListItem from './ListItem'

export default class Gainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gainersQuotes: null,
    };
  }
  
  getGainersQuotes() {
    const endpoint = `/api/stocks/list/gainers`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        gainersQuotes: json.gainers
      })
    })
  }
  componentWillMount() {
    this.getGainersQuotes()
  }
  
  render() {
    let outp = (<div></div>)
    if(this.state.gainersQuotes === null || this.state.gainersQuotes === undefined) {
      outp = (<div></div>)
    } else {
        outp = (
          <ListItem items = {this.state.gainersQuotes} addSymbol={this.props.addSymbol} activeTickers = {this.props.activeTickers}/>
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
  