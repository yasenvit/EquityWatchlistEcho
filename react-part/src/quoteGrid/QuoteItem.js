import React, { Component } from 'react';
import QuoteProps from './QuoteProps'

export default class QuoteItem extends Component {
    render() {
        return this.props.items.map((item, index) => (
            <QuoteProps key={index} item={item} delSymbol={this.props.delSymbol} setChartsTicker={this.props.setChartsTicker} />   
        ))  
    }
}
