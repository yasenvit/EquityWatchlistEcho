import React, { Component } from 'react';
import apiCall from '../util/apiCall';

import '../styles/style.css';
import PosItem from './PosItem';
import PosProps from './PosProps'

export default class Positions extends Component {
  state = {
    positions: [],
    positionsCostTotal: null,
    positionsValueTotal: null,
    positionsQty: null,
    sharesQty: null,
    changeTotal: null,
    changePercentageTotal: null,

    positionFor: null,
    error: ""
  }
 
  getSummary() {
    const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/positions/summary`
    const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then (json=> {
        this.setState({
          positions: json.positions,
          positionsCostTotal: json.positionsCostTotal,
          positionsValueTotal: json.positionsValueTotal,
          positionsQty: json.positionsQty,
          sharesQty: json.sharesQty,
          changeTotal: json.changeTotal,
          changePercentageTotal: json.changePercentageTotal
       })
      })
  }
  componentWillMount() {
    this.getSummary()
  }
  componentDidUpdate(prevProps) {
    if(this.props.positionFor !== prevProps.positionFor) {
      this.setState({positionFor : this.props.positionFor})
    } 
  }
  colored = (value)=> {
    if(value>0) {
      return {backgroundColor:"green",fontSize:"0.9rem",fontWeight:"500",padding:"0px",textAlign:"center"}
     } else if(value<0) {
        return {backgroundColor:"rgb(250, 85, 85)",fontSize:"0.9rem",fontWeight:"500",padding:"0px",textAlign:"center"}
      } else {
        return {color: "yellow",fontSize:"0.9rem",fontWeight:"500",padding:"0px",textAlign:"center"}
      }
    }
  render() {
    const roundTo = require('round-to') 
    let outp = (<div></div>)
    if(this.state.positionFor) {
      outp = (
        <PosProps setChartsTicker={this.props.setChartsTicker} item = {this.state.positionFor}/>
      )
    } else if(this.state.positions === [] || this.state.positions === undefined) {
      outp = (<div>NOTHING TO DISPLAY</div>)
    } else {
      outp = (
        <PosItem setChartsTicker={this.props.setChartsTicker} items = {this.state.positions}/>
      )
    }
    return (
      <div className="position-display">
        <div className="position-display-left">
          <table>
            <tr>
              <th><div>Total positions</div></th>
              <td style={styledCell}><div style={styledDiv}>{this.state.positionsQty}</div></td>
            </tr>
            <tr>
              <th>Total shares</th>
              <td style={styledCell}><div style={styledDiv}>{this.state.sharesQty}</div></td>
            </tr>
            <tr>
              <th>Funds Invested</th>
              <td style={styledCell}><div style={styledDiv}>{this.state.positionsCostTotal}</div></td>
            </tr>
            <tr>
              <th>Portfolio current value</th>
              <td style={styledCell}><div style={styledDiv}>{this.state.positionsValueTotal}</div></td>
            </tr>
            <tr>
              <th>Change</th>
              <td style={styledCell}><div style={this.colored(this.state.changeTotal)}>{this.state.changeTotal}</div></td>
            </tr>
            <tr>
              <th>Change %</th>
              <td style={styledCell}><div style={this.colored(this.state.changeTotal)}>{this.state.changePercentageTotal}</div></td>
            </tr>
          </table>
        </div>
        <div className="position-display-right">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Invested</th>
                <th>Carrent Value</th>
                <th>Change</th>
                <th>Change %</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {outp}
            </tbody>
          </table>
        </div>
      </div>
    )
   }
}
const styledDiv = {
  textAlign:"center",
  padding:"0.5rem"
}
const styledCell = {
  textAlign:"center",
  padding:"0rem"
}

