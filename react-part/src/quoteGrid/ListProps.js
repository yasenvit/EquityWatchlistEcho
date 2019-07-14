import React, { Component } from 'react';
import Charts from '../components/Charts'
export default class ListProps extends Component {
  
    render() {
        const roundTo = require('round-to')
        const {symbol, latestPrice} = this.props.item;
        let addButton = (<button></button>)
        if (this.props.activeTickers.includes(symbol)) {
            addButton = (
            <button className="btn-infocus" disabled = {'true'} >added</button>
            )
        } else {
            addButton = (
                <button className="btn-add" onClick = {this.props.addSymbol.bind(this,symbol)}>add</button>
            )
        }
        return (
            <tr>
                <th><button style={btnSymStyle} onClick={(event)=>(<Charts ticker = {this.props.item.symbol}/>, console.log("click-click-click-click"))}>{this.props.item.symbol}</button></th>
                <td>{latestPrice}</td>
                <td>{this.props.item.open}</td>
                <td>{this.props.item.close}</td>
                <td>{this.props.item.high}</td>
                <td>{this.props.item.low}</td>
                <td>{this.props.item.latestVolume}</td>
                <td>{this.props.item.change}</td>
                <td>{this.props.item.changePercent}</td>
                <td>{this.props.item.marketCap}</td>
                <td>{this.props.item.peRatio}</td>
                <td>{this.props.item.week52High}</td>
                <td>{this.props.item.week52Low}</td>
                <td>{this.props.item.ytdChange}</td>
                <td className="headcol">{addButton}</td>
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
