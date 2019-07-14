import React, { Component } from 'react';

export default class QuoteProps extends Component {

    render() {
        const roundTo = require('round-to')
        const {symbol, latestPrice, open, close, high, low,latestVolume, change, changePercent, marketCap,peRatio,week52High,
            week52Low, ytdChange} = this.props.item;
        return (
            <tr>
                <th><button style={btnSymStyle} onClick={()=>{this.props.setChartsTicker(symbol)}}>{symbol}</button></th>
                <td>{latestPrice}</td>
                <td>{open}</td>
                <td>{close}</td>
                <td>{high}</td>
                <td>{low}</td>
                <td>{latestVolume}</td>
                <td>{change}</td>
                <td>{changePercent}</td>
                <td>{marketCap}</td>
                <td>{peRatio}</td>
                <td>{week52High}</td>
                <td>{week52Low}</td>
                <td>{ytdChange}</td>
                <td className="headcol"><button className = "btn-del" onClick = {this.props.delSymbol.bind(this,symbol)}>del</button></td>
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
