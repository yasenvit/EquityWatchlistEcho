import React, { Component } from 'react';
import PosProps from './PosProps'

export default class PosItem extends Component {
    render() {
        return this.props.items.map((item, index) => (
            <PosProps key={index} item={item} delSymbol={this.props.delSymbol} setChartsTicker={this.props.setChartsTicker} />   
        ))  
    }
}