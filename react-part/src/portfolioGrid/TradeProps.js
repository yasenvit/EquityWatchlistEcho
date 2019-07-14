import React, { Component } from 'react';
export default class TradeProps extends Component {
    render() {
        const roundTo = require('round-to')
        const {ticker, shares, price, tradeCost, time } = this.props.item;
        return (
            <tr>
                <th><button style={btnSymStyle} onClick={()=>{this.props.setChartsTicker(ticker)}}>{ticker}</button></th>
                <td>{shares}</td>
                <td>{price}</td>
                <td>{tradeCost}</td>
                <td>{time}</td>
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
