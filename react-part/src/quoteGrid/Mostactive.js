import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import ListItem from './ListItem'

export default class Mostactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostactiveQuotes: null,
    };
  }
  mostactiveQuotes() {
    const endpoint = `/api/stocks/list/mostactive`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        mostactiveQuotes: json.mostactive
      })
    })
  }
  componentWillMount() {
    this.mostactiveQuotes()
  }
  
  render() {
    let outp = (<div></div>)
    if(this.state.mostactiveQuotes === null || this.state.mostactiveQuotes === undefined) {
      outp = (<div></div>)
    } else {
        outp = (
          <ListItem items = {this.state.mostactiveQuotes} addSymbol={this.props.addSymbol} activeTickers = {this.props.activeTickers}/>
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
  