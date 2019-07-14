import React, { Component } from 'react';
import TradeProps from './TradeProps'

export default class TradeItem extends Component {
    render() {
        return this.props.items.map((item, index) => (
            <TradeProps key={index} item={item} setChartsTicker={this.props.setChartsTicker}/>   
        ))  
    }
}
