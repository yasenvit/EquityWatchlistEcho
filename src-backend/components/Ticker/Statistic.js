import React, { Component } from 'react'
import '../../styles/style.css';

export default class Statistic extends Component {
    render() {
        // const tickerToLook  = this.props.match.params.symbol
        if(this.props.match.params.symbol) {
        console.log("STATISTIC tickerToLOOK", this.props.match.params.symbol)
        }
        return (
            <div>
                Statistic is here
                {this.props.lookupTicker}
            </div>
        )
    }
}
