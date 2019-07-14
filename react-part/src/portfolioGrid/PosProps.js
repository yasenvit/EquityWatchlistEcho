import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Charts from '../components/Charts'

export default class PosProps extends Component {
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
    const {ticker, shares, positionCost, positionValue, margin, marginPercentage} = this.props.item;
    return (
      <tr>
        <th><button style={btnSymStyle} onClick={()=>{this.props.setChartsTicker(ticker)}}>{ticker}</button></th>
        <td style={styledCell}><div style={styledDiv}>{shares}</div></td>
        <td style={styledCell}><div style={styledDiv}>{positionCost}</div></td>
        <td style={styledCell}><div style={styledDiv}>{positionValue}</div></td>
        <td style={styledCell}><div style={this.colored(margin)}>{margin}</div></td>
        <td style={styledCell}><div style={this.colored(marginPercentage)}>{marginPercentage}</div></td>
        <td style={styledCell}><button>chart</button></td>
      </tr>
    )
  }
}
const btnSymStyle ={
  background:'transparent',
  border: 'none',
  color: 'skyblue',
  fontSize: '0.7rem'
}
const styledDiv = {
  textAlign:"center",
  padding:"0.2rem"
}
const styledCell = {
  textAlign:"center",
  padding:"0rem"
}